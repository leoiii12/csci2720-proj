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
  location: string;
  comments: Comment[];
}

export class Comment {
  id: number;
  contact: string;
  username: string;
  createDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private http: HttpClient
  ) { }

  getEvent(id: string): Observable<Event> {
    return this.http
      .post<any>(environment.apiUrl + '/api/Event/Get', { id: id })
      .pipe(
        map(out => {
          return out.data.event as Event;
        })
      );
  }

  getEvents(): Observable<Event[]> {
    return this.http
      .get<any>(environment.apiUrl + '/api/Event/List')
      .pipe(
        map(out => {
          return out.data.events as Event[];
        })
      );
  }

  createEvent(newEvent: { title: string; time: string; organizer: string; contact: string; location: string; }): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + '/api/Event/Create', newEvent);
  }

  updateEvent(event: { title: string; time: string; organizer: string; contact: string; location: string; }): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + '/api/Event/Update', event);
  }

  deleteEvent(event: { id: string; }): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + '/api/Event/Delete', event);
  }

  reEvents(): Observable<any> {
    return this.http
      .get<any>(environment.apiUrl + '/api/Event/Re');
  }

  createComment(newComment: { content: string; username: string; eventId: string; }): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + '/api/Comment/Create', newComment);
  }

  getFundraiseEvents(): Observable<{ title: string; time: string; organizer: string; contact: string; location: string; }[]> {
    return this.http
      .get<any>('http://fundraising.one.gov.hk/fundraise_query/webservice/psi/json?itemperpage=100')
      .pipe(
        map(out => {
          return out.activities as {
            organisationNameEnglish: string;
            enquiryContact: string;
            schedule: { dateFrom: string; timeFrom: string; timeTo: string }[];
            activityNameEnglish: string;
            locationNameEnglish: string;
          }[];
        }),
        map(events => {
          return events.map(e => {
            return {
              title: e.activityNameEnglish,
              time: new Date(e.schedule[0].dateFrom + 'T' + e.schedule[0].timeFrom + '+08:00').toISOString(),
              organizer: e.organisationNameEnglish,
              contact: e.enquiryContact,
              location: e.locationNameEnglish
            };
          });
        })
      );
  }

}
