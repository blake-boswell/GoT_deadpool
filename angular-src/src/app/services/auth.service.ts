import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/users/register', user, {headers: headers})
    .map(res => res.json());
  }

// On success returns token and user info
  authenticateUser(user) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:8000/users/authenticate', user, {headers: headers})
    .map(res => res.json());
  }

  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:8000/users/profile', {headers: headers})
    .map(res => res.json());
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    //localStorage can only store strings, cannot store objects
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

// fetch token from localStorage so we can getProfile
  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired("id_token");
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
