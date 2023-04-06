import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/AuthService.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    HttpClientModule
  ],
  declarations: [Tab4Page],
  providers: [AuthService]
})
export class Tab4PageModule {}
