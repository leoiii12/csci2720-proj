import { NgxSpinnerService } from 'ngx-spinner';

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  public users = [];

  public newUser = {
    username: '',
    password: ''
  };

  public user = {
    id: '',
    username: '',
    password: ''
  };

  @ViewChild('newUserModal') newUserModal;
  @ViewChild('userModal') userModal;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  public openModal(modal) {
    this.modalService
      .open(modal, { ariaLabelledBy: 'modal-basic-title' }).result
      .then(result => {
        if (result === 'NewUserSave') {
          this.saveNewUser();
        }
        if (result === 'UserSave') {
          this.updateUser();
        }
        if (result === 'UserDelete') {
          this.deleteUser();
        }
      }, closeReason => {
        console.log(closeReason);
      });
  }

  public loadUsers() {
    this.spinner.show();

    this.userService.getUsers().subscribe(users => {
      this.users = users;

      this.spinner.hide();
    });
  }

  public saveNewUser() {
    this.spinner.show();

    this.userService.createUser(this.newUser).subscribe(() => {
      this.loadUsers();

      this.spinner.hide();
    });
  }

  public updateUser() {
    this.spinner.show();

    this.userService.updateUser(this.user).subscribe(() => {
      this.loadUsers();

      this.spinner.hide();
    });
  }

  public deleteUser(): any {
    this.spinner.show();

    this.userService.deleteUser(this.user).subscribe(() => {
      this.loadUsers();

      this.spinner.hide();
    });
  }

  public onActivate(event) {
    if (event.type === 'click') {
      event.cellElement.blur();

      this.user = event.row;
      this.openModal(this.userModal);
    }
  }

}
