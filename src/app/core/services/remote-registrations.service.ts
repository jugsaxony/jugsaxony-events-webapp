import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationEntity, RegistrationConfirmationEntity, EventId, RegistrationToken } from '../entities';
import { RegistrationData } from "../data";
import { environment } from '../../util/environment';

@Injectable()
export class RemoteRegistrationsService {

  readonly API_ROOT;

  constructor(
    private httpClient: HttpClient
  ) {
    this.API_ROOT = environment.apiRoot;
  }

  public register(eventId: EventId, registrationData: RegistrationData): Observable<HttpResponse<RegistrationConfirmationEntity>> {
    let data = { ...registrationData, eventId: eventId };
    if (!navigator.onLine) {
      return Observable.throw(new Error('Du bist offline. Die Anmeldung ist daher momentan nicht möglich'));
    }
    return this.httpClient
      .post<RegistrationConfirmationEntity>(`${this.API_ROOT}/registrations`, data, { observe: 'response' });
  }

  public unregister(registrationToken: RegistrationToken): Observable<HttpResponse<RegistrationConfirmationEntity>> {
    if (!navigator.onLine) {
      return Observable.throw(new Error('Du bist offline. Die Abmeldung ist daher momentan nicht möglich'));
    }
    return this.httpClient
      .delete<RegistrationConfirmationEntity>(`${this.API_ROOT}/registrations/${registrationToken}`, { observe: 'response' });
  }

  public getRegistration(token: RegistrationToken): Observable<RegistrationEntity> {
    if (token == null) {
      return Observable.empty();
    }
    return this.httpClient
      .get<any>(`${this.API_ROOT}/registrations/${token}`)
  }
}
