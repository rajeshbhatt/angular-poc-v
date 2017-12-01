import { Component, OnInit } from '@angular/core';
import { UserService } from '../auth/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  loading: boolean = false;
  showLogin: boolean = this.route.snapshot.routeConfig.path === 'login' ? true : false;
  model: any = {};
  showPassword: boolean = false;
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
  }
  signUp() {
    this.loading = true;
    this.userService.signUp(this.model)
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                // this.alertService.error(error);
                this.loading = false;
            });
  }

}
