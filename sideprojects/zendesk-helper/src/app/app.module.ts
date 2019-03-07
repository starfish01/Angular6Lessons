import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducers';


export const firebaseConfig = environment.firebase;
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { ZendeskBodyComponent } from './zendesk-body/zendesk-body.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AuthService } from './auth/auth.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './auth/user.service';
import { AuthGuard } from './auth/auth.guard';
import { Storage } from './shared/storage.service';
import { EntriesComponent } from './zendesk-body/entries/entries.component';
import { EntryComponent } from './zendesk-body/entries/entry/entry.component';
import { EntryEditComponent } from './zendesk-body/entries/entry-edit/entry-edit.component';
import { InformationManagerService } from './zendesk-body/information-manager.service';
import { ClipboardModule } from 'ngx-clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule,MatSelectModule,MatGridListModule,MatButtonModule,MatInputModule,MatMenuModule,MatDividerModule,MatCardModule,MatListModule,MatFormFieldModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserResolver } from './userdetails/user.resolver';
import { LayoutModule } from '@angular/cdk/layout';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ZendeskBodyComponent,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    UserdetailsComponent,
    EntriesComponent,
    EntryComponent,
    EntryEditComponent,
    EditCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    StoreModule.forRoot(reducers),
    ClipboardModule, 
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatGridListModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatSelectModule,
    LayoutModule
  ],
  providers: [AuthService, UserService, AuthGuard,Storage,InformationManagerService,UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
