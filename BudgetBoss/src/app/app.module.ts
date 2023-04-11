import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { AuthService } from './services/AuthService.service';
import { IonicStorageModule } from '@ionic/storage-angular';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { Tab3Page } from './tab3/tab3.page';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),IonicModule, AppRoutingModule,FormsModule,ReactiveFormsModule,NgChartsModule,IonicStorageModule.forRoot(), HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },AuthService,CookieService, Tab3Page, NavParams],
  bootstrap: [AppComponent],
})
export class AppModule {}
