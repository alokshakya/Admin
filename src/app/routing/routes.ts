import { Routes } from '@angular/router';


import { McqComponent } from '../components/mcq/mcq.component';
import { CodingComponent } from '../components/coding/coding.component';
import { LoginComponent } from '../components/login/login.component';
export const routes: Routes = [
  { path: 'mcq',  component: McqComponent },
  { path: 'coding',  component: CodingComponent },
  { path: 'login',  component: LoginComponent },
 
];