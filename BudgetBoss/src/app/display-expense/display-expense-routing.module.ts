import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayExpensePage } from './display-expense.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayExpensePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayExpensePageRoutingModule {}
