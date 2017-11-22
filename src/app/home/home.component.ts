import { Router } from '@angular/router';
import { AuthService } from 'angular4-social-login';
import { UserService } from './../auth/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  logout() {
    this.userService.setUserLoggedOut();
    this.router.navigate(['login']);
  }

}
