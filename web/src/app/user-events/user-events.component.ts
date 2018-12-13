import { NgxSpinnerService } from 'ngx-spinner';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventService } from '../event.service';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit {

  public events = [];
  public filteredEvents = [];

  constructor(
    private eventService: EventService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadEvents();
  }

  public loadEvents() {
    this.spinner.show();

    this.eventService.getEvents().subscribe((events: any[]) => {
      for (const event of events) {
        event.keywords = [].concat(
          event.title.toLowerCase().split(' '),
          event.organizer.toLowerCase().split(' '),
          event.location.toLowerCase().split(' ')
        );
      }

      this.events = Array.from(new Set(events));
      this.filteredEvents = this.events;

      this.spinner.hide();
    });
  }

  updateFilter(event) {
    if (event.target.value) {
      const keywords = event.target.value.toLowerCase().split(' ');
      console.log(keywords);

      this.filteredEvents = this.events
        .filter(e => {
          return e.keywords.filter(value => -1 !== keywords.indexOf(value)).length > 0;
        })
        .sort((e1, e2) => {
          return e2.keywords.filter(value => -1 !== keywords.indexOf(value)).length -
            e1.keywords.filter(value => -1 !== keywords.indexOf(value)).length;
        });
    } else {
      this.filteredEvents = this.events;
    }
  }

  public onActivate(event) {
    if (event.type === 'click') {
      event.cellElement.blur();

      this.router.navigate(['user/event', event.row.id]);
    }
  }

}
