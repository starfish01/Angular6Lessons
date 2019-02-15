import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZendeskBodyComponent } from './zendesk-body/zendesk-body.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full'},
  { path:'main', component:ZendeskBodyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
