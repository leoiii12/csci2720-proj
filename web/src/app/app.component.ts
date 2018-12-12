import { Subject } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public pageControls = {
    isCollapsed: false
  };

  private unsubscribe = new Subject<void>();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
