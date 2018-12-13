import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @LocalStorage('accessToken')
  public accessToken: string;

  @LocalStorage('username')
  public username: string;

  public usernameObservable = this.localStorage.observe('username');

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  public authenticate(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(environment.apiUrl + '/api/Auth/Authenticate', { username, password })
      .pipe(
        map(out => {
          this.accessToken = out.data.accessToken;
          this.username = username;
        })
      );
  }

  public logOut() {
    this.localStorage.clear();
  }

}
