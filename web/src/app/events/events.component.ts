import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public pageControls: { selectedDateTime: Date } = {
    selectedDateTime: undefined
  };

  public events = [];

  public newEvent = {
    title: '',
    time: '',
    organizer: '',
    contact: '',
    location: ''
  };

  public event = {
    id: '',
    title: '',
    time: '',
    organizer: '',
    contact: '',
    location: ''
  };

  @ViewChild('newEventModal') newEventModal;
  @ViewChild('eventModal') eventModal;

  constructor(
    private eventService: EventService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loadEvents();
  }

  public openModal(modal) {
    this.modalService
      .open(modal, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(result => {
        if (result === 'NewEventSave') {
          this.saveNewEvent();
        }
        if (result === 'EventSave') {
          this.updateEvent();
        }
        if (result === 'EventDelete') {
          this.deleteEvent();
        }
      }, closeReason => {
        console.log(closeReason);
      });
  }

  public reEvents() {
    this.spinner.show();

    this.eventService
      .getFundraiseEvents()
      .subscribe(events => {
        alert(
          'We have detected ' +
          events.length + ' events, and they will be imported after the existing events are cleared. Please wait.');

        if (events.length === 0) { return; }

        // Clear events and import events
        this.eventService
          .reEvents()
          .pipe(flatMap(() => {

            const eventObservables = events.map(e => this.eventService.createEvent(e));

            return forkJoin(...eventObservables);
          }))
          .subscribe(() => {
            this.spinner.hide();

            this.loadEvents();
          });
      });
  }

  public loadEvents() {
    this.spinner.show();

    this.eventService.getEvents().subscribe(users => {
      this.events = users;

      this.spinner.hide();
    });
  }

  public saveNewEvent() {
    this.spinner.show();

    if (this.pageControls.selectedDateTime) {
      this.newEvent.time = this.pageControls.selectedDateTime.toISOString();
    } else {
      this.newEvent.time = new Date().toISOString();
    }

    this.eventService.createEvent(this.newEvent).subscribe(() => {
      this.loadEvents();

      this.spinner.hide();
    });
  }

  public updateEvent() {
    this.spinner.show();

    if (this.pageControls.selectedDateTime) {
      this.event.time = this.pageControls.selectedDateTime.toISOString();
    } else {
      this.event.time = new Date().toISOString();
    }

    this.eventService.updateEvent(this.event).subscribe(() => {
      this.loadEvents();

      this.spinner.hide();
    });
  }

  public deleteEvent(): any {
    this.spinner.show();

    this.eventService.deleteEvent(this.event).subscribe(() => {
      this.loadEvents();

      this.spinner.hide();
    });
  }

  public onActivate(event) {
    if (event.type === 'click') {
      event.cellElement.blur();

      this.event = event.row;
      this.pageControls.selectedDateTime = new Date(this.event.time);

      this.openModal(this.eventModal);
    }
  }
}
