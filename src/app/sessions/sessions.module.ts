import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsComponent } from './page/sessions.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    SessionsComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SessionsRoutingModule,
  ]
})
export class SessionsModule { }
