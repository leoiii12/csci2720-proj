import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class User {
  id: string;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http
      .get<any>(environment.apiUrl + '/api/User/List')
      .pipe(
        map(out => {
          return out.data.users as User[];
        })
      );
  }

  createUser(newUser: { username: string; password: string }) {
    return this.http
      .post<any>(environment.apiUrl + '/api/User/Create', newUser);
  }

}
