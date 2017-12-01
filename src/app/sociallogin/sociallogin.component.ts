import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../auth/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';

@Component({
  selector: 'app-sociallogin',
  templateUrl: './sociallogin.component.html',
  styleUrls: ['./sociallogin.component.css']
})
export class SocialloginComponent implements OnInit {
  loading: boolean = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    // private authService: AuthService,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
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
