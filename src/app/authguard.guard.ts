import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './auth/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor(private user: UserService, private router: Router){  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return this.user.getUserLoggedIn();
    if(this.user.getUserLoggedIn()) {
      // this.router.navigate(['home']);
      return true;
    }
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
