import { NgxSpinnerService } from 'ngx-spinner';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Event, EventService } from '../event.service';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.scss']
})
export class UserEventComponent implements OnInit {

  public pageControls: { id: string; } = {
    id: ''
  };

  public event: Event = undefined;

  public newComment = {
    eventId: '',
    content: '',
    username: ''
  };

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageControls.id = params.id;

      this.loadEvent();
    });
  }

  loadEvent() {
    this.eventService.getEvent(this.pageControls.id).subscribe(event => {
      this.event = event;

      this.event.comments = this.event.comments.sort((a, b) => {
        return b.id - a.id;
      });
    });
  }

  onCommentEnter() {
    this.spinner.show();

    this.newComment.eventId = this.event.id;
    this.newComment.username = 'leochoi';

    this.eventService.createComment(this.newComment).subscribe(() => {
      this.newComment.content = '';

      this.loadEvent();

      this.spinner.hide();
    });
  }

}
