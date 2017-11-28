import { UserService } from './user.service';
import { Component, OnInit, NgModule, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
// import { AuthService as a } from './auth.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from "angular4-social-login";
import * as auth0 from 'auth0-js';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  encapsulation: ViewEncapsulation.None
})

// @NgModule({
//   imports: [MatInputModule]
// })
export class AuthComponent implements OnInit {
  loading: boolean = false;
  model: any = {};
  showPassword: boolean = false;
  returnUrl: string;

  auth0 = new auth0.WebAuth({
    clientID: 'XTJxBdr6W3xwlGwxdxI2VxTAHbOYaHmS',
    domain: 'soc-rich.auth0.com',
    responseType: 'token id_token',
    audience: 'https://soc-rich.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/callback',      
    scope: 'openid'
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    userService.handleAuthentication();
    
   }

  ngOnInit() {
    const hide = true;
    // this.AuthService.logout();
    if( this.userService.getUserLoggedIn()) {
      this.router.navigate(['home']);
    }

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login () {
    this.loading = true;
    this.userService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                // this.alertService.error(error);
                this.loading = false;
            });
  }

  signInWithTwitter () {
    this.loading = true;
    this.userService.logintwitter();
        // .subscribe(
        //     data => {
        //         this.router.navigate([this.returnUrl]);
        //     },
        //     error => {
        //         // this.alertService.error(error);
        //         this.loading = false;
        //     });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res)=> {
        this.userService.setUserLoggedIn();
        this.router.navigate(['home']);
      });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res)=> {
      console.log('fb : response:',res);
      this.userService.setUserLoggedIn();
      this.router.navigate(['home']);
      // todo set this to fb  
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
  
}
