import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { loginService } from '../services/loginService.service';
import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { ToastController } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    HttpClientModule
  ],
  declarations: [RegisterPage],
  providers: [loginService]
})
export class RegisterPageModule {}
