import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZendeskBodyComponent } from './zendesk-body/zendesk-body.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { AuthGuard } from './auth/auth.guard';
import { EntriesComponent } from './zendesk-body/entries/entries.component';
import { EntryComponent } from './zendesk-body/entries/entry/entry.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path:'main', component:ZendeskBodyComponent, children:[
    { path:':id', component:EntriesComponent, children: [
      { path:':entry', component:EntryComponent }
    ] },
    // { path:'/entry/:id/edit',component: EditEntryComponent, canActivate:[AuthGuard]}
  ]},
  { path:'login', component: LoginComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: SignupComponent,canActivate: [AuthGuard]},
  { path: 'logout', component: LogoutComponent },
  { path:'user', component: UserdetailsComponent },
  { path: "**", redirectTo: "/main" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
