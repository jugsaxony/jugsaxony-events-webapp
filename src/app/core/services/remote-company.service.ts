import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { environment } from "../../util/environment";
import { CompanyEntity } from "../entities";

@Injectable()
export class RemoteCompanyService {

    readonly API_ROOT: string;

    readonly COMPANY_REFRESH_MILLIS: number;

    private spotlight: CompanyEntity[];

    private companyById: { [key: number]: CompanyEntity; } = {};

    private nextSpotlightRefresh: number;

    private nextCompanyRefresh: { [key: number]: number; } = {}

    constructor(
        private httpClient: HttpClient
    ) {
        this.API_ROOT = environment.apiRoot;
        this.COMPANY_REFRESH_MILLIS = environment.companyRefreshMillis;
    }

    public getCompany(id: number): Observable<CompanyEntity> {
        if (this.companyById[id] && Date.now() < this.nextCompanyRefresh[id]) {
            return Observable.of(this.companyById[id]);
        } else {
            return this.refreshCompany(id);
        }
    }

    public getSpotlight(): Observable<CompanyEntity[]> {
        if (this.spotlight && Date.now() < this.nextSpotlightRefresh) {
            return Observable.of(this.spotlight);
        } else {
            return this.refreshSpotlight();
        }
    }

    private refreshSpotlight(): Observable<CompanyEntity[]> {
        return this.httpClient.get<CompanyEntity[]>(`${this.API_ROOT}/companies/spotlight`)
            .map(res => res || [])
            .do(res => res.forEach(s => this.companyById[s.id] = s))
            .do(res => res.forEach(s => this.nextCompanyRefresh[s.id] = Date.now() + this.COMPANY_REFRESH_MILLIS))
            .do(res => this.nextSpotlightRefresh = Date.now() + this.COMPANY_REFRESH_MILLIS);
    }

    private refreshCompany(id: number): Observable<CompanyEntity> {
        return this.httpClient.get<CompanyEntity>(`${this.API_ROOT}/companies/${id}`)
            .filter(res => !!res)
            .do(res => this.companyById[res.id] = res)
            .do(res => this.nextCompanyRefresh[res.id] = Date.now() + this.COMPANY_REFRESH_MILLIS);
    }
}
