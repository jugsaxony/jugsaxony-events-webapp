import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../util/environment';

@Injectable()
export class RemoteAboutService {

  readonly API_PATH: string;

  private aboutCache = {};

  constructor(
    private httpClient: HttpClient
  ) {
    this.API_PATH = environment.apiRoot;
  }

  public getFaq(): Observable<any> {
    let name = 'faq';
    if (this.aboutCache[name]) {
      return Observable.of(this.aboutCache[name]);
    } else {
      return this.httpClient
        .get<any[]>(`${this.API_PATH}/about/${name}`)
        .do(res => this.aboutCache[name] = res);
    }
  }
}
