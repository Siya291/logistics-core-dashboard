import { Routes } from '@angular/router';
import { CourierListComponent } from './components/courier-list/courier-list.component';
import { CourierMap } from './components/courier-map/courier-map';
import { LoginComponent } from './components/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'couriers',
    component: CourierListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'map',
    component: CourierMap,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '/couriers' }
];
