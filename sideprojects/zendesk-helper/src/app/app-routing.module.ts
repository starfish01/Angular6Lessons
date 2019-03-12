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
import { EntryEditComponent } from './zendesk-body/entries/entry-edit/entry-edit.component';
import { UserResolver } from './userdetails/user.resolver';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { HomepageComponent } from './core/homepage/homepage.component';


const routes: Routes = [
  { path: '', component:HomepageComponent },
  { path:'main', component:ZendeskBodyComponent, canActivate: [AuthGuard], children:[
    { path:':id', component:EntriesComponent, canActivate: [AuthGuard], children: [
      { path:':entry', component:EntryComponent, canActivate: [AuthGuard] },
      { path: ':entry/edit', component:EntryEditComponent, canActivate: [AuthGuard]}
    ] },
    // { path:'/entry/:id/edit',component: EditEntryComponent, canActivate:[AuthGuard]}
  ]},
  { path: 'edit-categories', component: EditCategoriesComponent, canActivate: [AuthGuard] },
  { path:'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'logout', component: LogoutComponent },
  { path:'user', component: UserdetailsComponent },
  { path: "**", redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
