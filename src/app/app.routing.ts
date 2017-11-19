import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '@angular/router/src/config';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: AuthComponent },
    { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
