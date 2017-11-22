import { FacebookLoginProvider } from 'angular4-social-login';
// import { AuthService } from './auth.service';
import { AuthService } from 'angular4-social-login';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private  isUserLoggedIn : boolean;
  private userName: 'string';
  constructor(authService: AuthService) {
    // this.isUserLoggedIn = false;
    this.isUserLoggedIn = sessionStorage.getItem('isLoggedIn') ? true : false;
    authService;
   }

  setUserLoggedIn() {
    console.log('set');
    this.isUserLoggedIn = true;
    sessionStorage.setItem('isLoggedIn','true');
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
  setUserLoggedOut() {
    this.isUserLoggedIn = false;
    sessionStorage.removeItem('isLoggedIn');
  }
  loggedOut() {
    sessionStorage.removeItem('isLoggedIn');
    this.isUserLoggedIn = false;
  }
}
