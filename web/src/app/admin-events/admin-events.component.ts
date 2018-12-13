import { FileSystemFileEntry, UploadEvent } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import * as Papa from 'papaparse';
import { forkJoin, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EventService } from '../event.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {

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

  public importEvents() {
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

  public onDropped(event: UploadEvent) {
    this.spinner.show();

    for (const droppedFile of event.files) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;

      fileEntry.file(file => {
        Papa.parse(file, {
          skipEmptyLines: true,
          complete: (results) => {
            alert('Your csv has been parsed, and the events will be imported.');

            const eventObservables = results.data.map(e => this.eventService.createEvent(e));

            forkJoin(...eventObservables).subscribe(() => {
              this.spinner.hide();

              this.loadEvents();
            });
          },
          header: true
        });
      });
    }
  }

}
