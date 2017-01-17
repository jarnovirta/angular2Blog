import { Injectable }  from '@angular/core';
import { Headers, Http } from '@angular/http';

import { JwtHelper }  from 'node_modules/angular2-jwt';

import { User }  from './../models/user';

@Injectable()
export class UserService {

  // jwtHelper: JwtHelper = new JwtHelper();

  private localStorageTokenName = 'codeGizmosJWTToken';
  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
    console.error('Post service error: ', error); // for demo purposes only
      return Promise.reject(error.message || error);
  } 

  constructor(private http: Http) {}

  login(user: User): Promise<User> {
    const sessionUrl = 'api/sessions';
    console.log("Logging in " + user);
    return this.http
      .post(sessionUrl, JSON.stringify(user), { headers: this.headers })
      .toPromise()
      .then(res => {
        var token = res.json();
        console.log("Token: " + token);
        localStorage[this.localStorageTokenName] = token;
        console.log("Decoded " + jwtHelper.decode(token));
        return new User(jwtHelper.decode(token));
      })
      .catch(this.handleError);
  }

  getUser(): User {
    if (!localStorage[this.localStorageTokenName] || jwtHelper.isTokenExpired(localStorage[this.localStorageTokenName])) {
      return null
    }
    else {
      return jwtHelper.decodeToken(localStorage[this.localStorageTokenName]);
    }
  } 

  logout(): void {
    localStorage.removeItem(this.localStorageTokenName);
  }
  loggedIn() {
    return jwtHelper.isTokenExpired(!localStorage[this.localStorageTokenName]);
  }

  getJWTAuthToken(): String {
    return localStorage[this.localStorageTokenName];  
  }
