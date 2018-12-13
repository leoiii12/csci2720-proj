import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public pageControls = {
    isCollapsed: false,
    username: ''
  };

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.pageControls.username = this.authService.username;

    this.authService.usernameObservable.subscribe(username => {
      setTimeout(() => {
        this.pageControls.username = username;
      });
    });
  }
}
