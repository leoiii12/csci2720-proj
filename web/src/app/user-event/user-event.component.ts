import { NgxSpinnerService } from 'ngx-spinner';

import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Event, EventService } from '../event.service';

@Component({
  selector: 'app-user-event',
  templateUrl: './user-event.component.html',
  styleUrls: ['./user-event.component.scss']
})
export class UserEventComponent implements OnInit {

  public pageControls: { id: string; mapURL: SafeResourceUrl; } = {
    id: '',
    mapURL: ''
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
    private spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageControls.id = params.id;

      this.loadEvent();
    });
  }

  loadEvent() {
    this.eventService.getEvent(this.pageControls.id, 'leochoi').subscribe(event => {
      this.event = event;
      this.event.comments = this.event.comments.sort((a, b) => {
        return b.id - a.id;
      });

      if (!this.pageControls.mapURL) {
        this.pageControls.mapURL = this.sanitizer.bypassSecurityTrustResourceUrl(
          'https://www.google.com/maps/embed/v1/place?key=AIzaSyDbzMaMWoHAI1E21S8qUyaly9RXkmJDxvA&q=' +
          encodeURIComponent(event.location));
      }
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

  onFavorite() {
    this.spinner.show();

    this.eventService.favoriteEvent(this.event.id, 'leochoi').subscribe(() => {
      this.loadEvent();

      this.spinner.hide();
    });
  }

  onUnfavorite() {
    this.spinner.show();

    this.eventService.unfavoriteEvent(this.event.id, 'leochoi').subscribe(() => {
      this.loadEvent();

      this.spinner.hide();
    });
  }

}
