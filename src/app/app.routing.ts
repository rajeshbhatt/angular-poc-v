import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '@angular/router/src/config';
import { AuthguardGuard } from './authguard.guard';
import { ForgotPassowrdComponent } from './forgot-passowrd/forgot-passowrd.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
    { 
        path: '',
        component: HomeComponent
    },
    { 
        path: 'home',
        component: HomeComponent,
        // canActivate: [AuthguardGuard]
    },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPassowrdComponent },
    { path: 'register', component: SignupComponent },
    { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
