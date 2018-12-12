import { Component, OnInit, ViewChild } from '@angular/core';
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

  public user = {
    id: '',
    username: '',
    password: ''
  };

  @ViewChild('newUserModal') newUserModal;
  @ViewChild('userModal') userModal;

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
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  public saveNewUser() {
    this.userService.createUser(this.newUser).subscribe(() => {
      this.loadUsers();
    });
  }

  public updateUser() {
    this.userService.updateUser(this.user).subscribe(() => {
      this.loadUsers();
    });
  }

  public deleteUser(): any {
    this.userService.deleteUser(this.user).subscribe(() => {
      this.loadUsers();
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
