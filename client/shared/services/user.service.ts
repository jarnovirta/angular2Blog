import { Injectable, EventEmitter }  from '@angular/core';
import { Headers, Http } from '@angular/http';

import { JwtHelper }  from 'angular2-jwt';

import { User }  from './../models/user';

@Injectable()
export class UserService {

  jwtHelper = new JwtHelper();

  private localStorageTokenName = 'codeGizmosJWTToken';
  private headers = new Headers({'Content-Type': 'application/json'});
  private loggedInUserChangeEmitter = new EventEmitter<User>();

  constructor(private http: Http) {}

  private handleError(error: any): Promise<any> {
    console.error('Network error: ', error); // for demo purposes only
      return Promise.reject(error.message || error);
  } 

  login(user: User): void {
    const sessionUrl = 'api/sessions';
    return this.http
      .post(sessionUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => {
        // Login success
        if (res.status == 200) {
          var token = res.json();
          localStorage[this.localStorageTokenName] = token;
          var loggedInUser = new User(this.jwtHelper.decodeToken(token));
          this.loggedInUserChangeEmitter.emit(loggedInUser)
        }
      })
      .catch(error => { 
        if (error.status == 401) {
          console.error("Unauthorised!");
        }
        else {
          console.error("Error logging in!");
        }
      });
  }

  getUser(): User {
    if (!localStorage[this.localStorageTokenName] || this.jwtHelper.isTokenExpired(localStorage[this.localStorageTokenName])) {
      return null
    }
    else {
      return this.jwtHelper.decodeToken(localStorage[this.localStorageTokenName]);
    }
  } 

  getLoggedInUserChangeEmitter(): EventEmitter<User> {
    return this.loggedInUserChangeEmitter;
  }

  logout(): void {
    localStorage.removeItem(this.localStorageTokenName);
    this.loggedInUserChangeEmitter.emit(null);
  }
  loggedIn() {
    return this.jwtHelper.isTokenExpired(localStorage[this.localStorageTokenName]);
  }

  getJWTAuthToken(): String {
    return localStorage[this.localStorageTokenName];  
  }
}