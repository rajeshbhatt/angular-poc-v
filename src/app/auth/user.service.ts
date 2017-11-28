import { FacebookLoginProvider } from 'angular4-social-login';
// import { AuthService } from './auth.service';
import { AuthService } from 'angular4-social-login';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as auth0 from 'auth0-js';
import { Router, ActivatedRoute } from '@angular/router';
import { debug } from 'util';

@Injectable()
export class UserService {
  private  isUserLoggedIn : boolean;
  private userName: 'string';
  auth0 = new auth0.WebAuth({
    clientID: 'XTJxBdr6W3xwlGwxdxI2VxTAHbOYaHmS',
    domain: 'soc-rich.auth0.com',
    responseType: 'token id_token',
    audience: `https://soc-rich.auth0.com/userinfo`, // todo domain
    redirectUri: 'http://localhost:4200',
    scope: 'openid'
    });
  constructor(
    authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private http: Http
  ) {
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
  public logintwitter(): void {
    debugger
    this.auth0.authorize();
    debugger;
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.setUserLoggedIn();
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logoutTwitter(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  login(username: string, password: string) {
    let a = {"appUser":{"password":"Neeraj@123","emailId":"e.neerajgulati@gmail.com","isdCode":0,"regType":"E"},"maxResults":0};
    return this.http.post('http://35.167.181.62:8080/user-service/users/authenticate/AppUser', a)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            let user = response.json();
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }

            return user;
        });
  }
}
