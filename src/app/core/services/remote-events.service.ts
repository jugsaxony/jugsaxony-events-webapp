import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventEntity, EventId } from '../entities';
import { environment } from '../../util/environment';

@Injectable()
export class RemoteEventsService {

  readonly API_ROOT;

  readonly EVENT_REFRESH_MILLIS;

  private events: EventEntity[];

  private nextRefresh: number;

  constructor(
    private httpClient: HttpClient
  ) {
    this.API_ROOT = environment.apiRoot;
    this.EVENT_REFRESH_MILLIS = environment.eventRefreshMillis;
  }

  public getEvents(): Observable<EventEntity[]> {
    if (this.events && Date.now() < this.nextRefresh) {
      return Observable.of(this.events);
    } else {
      return this.refreshEvents();
    }
  }

  public getEvent(id: EventId): Observable<EventEntity> {
    return this.getEvents()
      .mergeMap(e => {
        let cached = e.filter(e => e.id == id);
        if (cached.length > 0) {
          return Observable.from(cached);
        } else {
          return this.refreshEvent(id);
        }
      });
  }

  private refreshEvents(): Observable<EventEntity[]> {
    return this.httpClient
      .get<any[]>(`${this.API_ROOT}/events`)
      .map(res => res || [])
      .map(res => res.map(e => this.enrichEvent(e)))
      .do(res => this.events = res)
      .do(res => this.nextRefresh = Date.now() + this.EVENT_REFRESH_MILLIS);
  }

  private refreshEvent(id: EventId): Observable<EventEntity> {
    return this.httpClient
      .get<EventEntity>(`${this.API_ROOT}/events/${id}`)
      .filter(res => !!res)
      .do(res => this.enrichEvent(res))
      .do(res => this.events = this.events ? [...this.events, res] : [res]);
  }

  private enrichEvent(event: any): EventEntity {
    if (event.startTime != null) {
      event.startTime = new Date(event.startTime);
    }
    if (event.endTime != null) {
      event.endTime = new Date(event.endTime);
    }
    return event;
  }
}
