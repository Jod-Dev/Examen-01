import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../pages/home/home.component';
import {LoginComponent} from '../auth/login/login.component';
import {RegisterComponent} from '../auth/register/register.component';
import {PagenotfoundComponent} from '../pages/pagenotfound/pagenotfound.component';
import {MainComponent} from '../pages/main.component';
import {AuthGuard} from '../guards/auth.guard';
import {MyprofileComponent} from '../pages/myprofile/myprofile.component';


const routes: Routes = [
  {path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'profile', component: MyprofileComponent},
      {path: '', redirectTo: '/home', pathMatch: 'full'}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
