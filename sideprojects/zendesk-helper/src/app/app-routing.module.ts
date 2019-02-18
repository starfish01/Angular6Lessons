import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZendeskBodyComponent } from './zendesk-body/zendesk-body.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path:'main', component:ZendeskBodyComponent },
  { path:'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent,canActivate: [AuthGuard]},
  { path: 'logout', component: LogoutComponent },
  { path:'user', component: UserdetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
