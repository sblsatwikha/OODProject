import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { loginService } from '../services/loginService.service';
import { LoginPageRoutingModule } from './login-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    HttpClientModule
  ],
  declarations: [LoginPage],
  providers: [loginService]
})
export class LoginPageModule {}
