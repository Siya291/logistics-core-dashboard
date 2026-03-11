import { Routes } from '@angular/router';
import { CourierListComponent } from './components/courier-list/courier-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'couriers', pathMatch: 'full' },
  { path: 'couriers', component: CourierListComponent },
];
