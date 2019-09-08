import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../util/environment';

@Injectable()
export class RemoteWpPagesService {

  readonly API_PATH: string;
  readonly WP_PAGES: { [key: string]: number };

  private wpPageCache = {};

  constructor(
    private httpClient: HttpClient
  ) {
    this.API_PATH = environment.wpApiRoot;
    this.WP_PAGES = environment.wpPages;
  }

  public getImprintDocument(): Observable<any> {
    return this.getPage('imprint');
  }

  public getAboutDocument(): Observable<any> {
    return this.getPage('about');
  }

  public getDataProtectionDocument(): Observable<any> {
    return this.getPage('data-protection');
  }

  private getPage(name: string): Observable<any> {
    if (this.wpPageCache[name]) {
      return Observable.of(this.wpPageCache[name]);
    } else {
      return this.httpClient
        .get<any[]>(`${this.API_PATH}/pages/${this.WP_PAGES[name]}`)
        .do(res => this.wpPageCache[name] = res);
    }
  }
}
