import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private  isUserLoggedIn : boolean;
  private userName: 'string';
  constructor() {
    // this.isUserLoggedIn = false;
    this.isUserLoggedIn = sessionStorage.getItem('isLoggedIn') ? true : false;
   }

  setUserLoggedIn() {
    console.log('set');
    this.isUserLoggedIn = true;
    sessionStorage.setItem('isLoggedIn','true');
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }
}
