import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayExpensePageRoutingModule } from './display-expense-routing.module';

import { DisplayExpensePage } from './display-expense.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayExpensePageRoutingModule
  ],
  declarations: [DisplayExpensePage]
})
export class DisplayExpensePageModule {}
