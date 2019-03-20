import { RouterModule } from '@angular/router';
import { LogInComponent } from './app/components/log-in/log-in.component';
import { SignUpComponent } from './app/components/sign-up/sign-up.component';
import { LandingComponent } from './app/components/landing/landing.component';


RouterModule.forRoot([
    { path: 'log-in', component: LogInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: '', component: LandingComponent },
    { path: '**', redirectTo: '/' }
  ])