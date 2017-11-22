import { UserService } from './user.service';
import { Component, OnInit, NgModule, ViewEncapsulation } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
// import { AuthService } from './auth.service';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from "angular4-social-login";
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const hide = true;
    // this.AuthService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login () {
    this.loading = true;
    // this.authService.login(this.model.username, this.model.password)
    //     .subscribe(
    //         data => {
    //             this.router.navigate([this.returnUrl]);
    //         },
    //         error => {
    //             // this.alertService.error(error);
    //             this.loading = false;
    //         });
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res)=> {
        this.userService.setUserLoggedIn();
        // this.router.navigate(['home']);
      });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res)=> {
      debugger;
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
