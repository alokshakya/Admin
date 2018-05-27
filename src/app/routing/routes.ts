import { Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { McqComponent } from '../components/mcq/mcq.component';
import { McqtestComponent } from '../components/mcqtest/mcqtest.component';
import { CodingComponent } from '../components/coding/coding.component';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
export const routes: Routes = [
  { path: 'mcq/:id',  component: McqComponent, canActivate: [AuthGuard] },
  { path: 'mcqtest',  component: McqtestComponent, canActivate: [AuthGuard] },
  { path: 'coding',  component: CodingComponent, canActivate: [AuthGuard] },
  { path: 'login',  component: LoginComponent },
  { path: 'dashboard',  component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '',  component: LoginComponent }
 
];