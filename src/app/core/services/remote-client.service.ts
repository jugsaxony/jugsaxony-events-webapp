import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientConfigurationEntity } from '../entities';
import { environment } from '../../util/environment';

@Injectable()
export class RemoteClientService {

  readonly API_ROOT: string;

  constructor(
    private httpClient: HttpClient
  ) {
    this.API_ROOT = environment.apiRoot;
  }

  public getConfiguration(): Observable<ClientConfigurationEntity> {
    return this.httpClient
      .get<any>(`${this.API_ROOT}/client/configuration`)
  }
}
