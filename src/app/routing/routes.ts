import { Routes } from '@angular/router';


import { McqComponent } from '../components/mcq/mcq.component';
import { McqtestComponent } from '../components/mcqtest/mcqtest.component';
import { CodingComponent } from '../components/coding/coding.component';
import { LoginComponent } from '../components/login/login.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
export const routes: Routes = [
  { path: 'mcq/:id',  component: McqComponent },
  { path: 'mcqtest',  component: McqtestComponent },
  { path: 'coding',  component: CodingComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'dashboard',  component: DashboardComponent },
  { path: '',  component: LoginComponent }
 
];