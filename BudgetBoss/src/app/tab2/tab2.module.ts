import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { expenseService } from '../services/expenseService.service';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { categoryService } from '../services/categoryService.service';
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    HttpClientModule
  ],
  declarations: [Tab2Page],
  providers: [expenseService,categoryService]
})
export class Tab2PageModule {}
