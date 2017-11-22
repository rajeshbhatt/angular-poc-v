import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '@angular/router/src/config';
import { AuthguardGuard } from './authguard.guard';

const appRoutes: Routes = [
    { 
        path: '',
        component: AuthComponent
    },
    { 
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthguardGuard]
    },
    { path: 'login', component: AuthComponent },
    { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
