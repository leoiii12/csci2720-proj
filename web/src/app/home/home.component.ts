import { NgxSpinnerService } from 'ngx-spinner';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit() {
    const accessToken = this.authService.accessToken;
    const username = this.authService.username;

    if (accessToken && username) {
      this.router.navigate(['user/events']);
    }
  }

  public onLogIn() {
    this.spinner.show();

    this.authService.authenticate(this.user.username, this.user.password).subscribe(() => {
      this.spinner.hide();

      this.router.navigate(['/user/events']);
    });
  }

}
