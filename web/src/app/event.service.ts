import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Event {
  id: string;
  title: string;
  time: string;
  organizer: string;
  contact: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getEvents(): Observable<Event[]> {
    return this.http
      .get<any>(environment.apiUrl + '/api/Event/List')
      .pipe(
        map(out => {
          return out.data.events as Event[];
        })
      );
  }

  createEvent(newEvent: { title: string; time: string; organizer: string; contact: string; }) {
    return this.http
      .post<any>(environment.apiUrl + '/api/Event/Create', newEvent);
  }

  updateEvent(event: { title: string; time: string; organizer: string; contact: string; }) {
    return this.http
      .post<any>(environment.apiUrl + '/api/Event/Update', event);
  }

  deleteEvent(event: { id: string; }) {
    return this.http
      .post<any>(environment.apiUrl + '/api/Event/Delete', event);
  }

}
