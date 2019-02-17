import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZendeskBodyComponent } from './zendesk-body/zendesk-body.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LogoutComponent } from './auth/logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path:'main', component:ZendeskBodyComponent },
  { path:'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'logout', component: LogoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
