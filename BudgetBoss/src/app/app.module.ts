import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { loginService } from './services/loginService.service';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),IonicModule, AppRoutingModule,FormsModule,ReactiveFormsModule,NgChartsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },loginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
