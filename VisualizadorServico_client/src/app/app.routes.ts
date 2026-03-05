import { Routes } from '@angular/router';
import { PoolsIis } from './pools-iis/pools-iis';

export const routes: Routes = [
  { path: '', redirectTo: 'pools', pathMatch: 'full' },
  { path: 'pools', component: PoolsIis },
];
