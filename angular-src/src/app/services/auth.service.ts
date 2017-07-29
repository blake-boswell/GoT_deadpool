import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/users/register', user, {headers: headers})
    .map(res => res.json());
  }

// On success returns token and user info
  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8080/users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    //localStorage can only store strings, cannot store objects
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
