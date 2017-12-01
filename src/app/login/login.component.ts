import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { AuthService } from '../auth/auth.service';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

}
