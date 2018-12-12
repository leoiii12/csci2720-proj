import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users = [];

  public newUser = {
    username: '',
    password: ''
  };

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  public openModal(modal) {
    this.modalService
      .open(modal, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(result => {
        if (result === 'Save') {
          this.saveNewUser();
        }
      }, closeReason => {
        console.log(closeReason);
      });
  }

  public loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  public saveNewUser() {
    this.userService.createUser(this.newUser).subscribe(() => {
      this.loadUsers();
    });
  }

}
