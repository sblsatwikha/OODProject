import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, from, of, throwError } from "rxjs";
import { map, switchMap, flatMap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { access } from "fs";
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class subscriptionService {

  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  checkUserObs: Observable<any> | undefined;
  url: string = 'http://localhost:8081/api/subscription';
  access_token: string | string[] = [];
  constructor(
    private readonly storage: Storage,
    private readonly platform: Platform,
    private readonly http: HttpClient,
    private cookieService: CookieService

  ) {
    // this.loadUserInfo();
  }

  //   loadUserInfo() {
  //     let readyPlatformObs = from(this.platform.ready());

  //     this.checkUserObs = readyPlatformObs.pipe(
  //       switchMap(() => {
  //           return from(this.getAccessToken());
  //       }),
  //       map((token) => {
  //         if(!token){
  //           return null;
  //         }
  //           var decodedUser = this.jwtHelper.decodeToken(token);
  //           this.userInfo.next(decodedUser);
  //           return true;
  //       }));

  //   }

  //   getAccessToken(){
  //     return this.storage.get("access_token");
  //   }

  //   getRefreshToke(){
  //     return this.storage.get("refresh_token");
  //   }

  getSubscriptionsData() {
    console.log('Subscription service triggered');
    console.log(this.cookieService.getAll());
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true
    };
    return this.http.get(`${this.url}/getSubscriptions`, httpOptions);
  }

  postNewSubscription(newSubscription: any) {
    console.log(newSubscription['subscriptionName']);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    const url = `${this.url}/newSubscription`;
    return this.http.post<any>(url, newSubscription, httpOptions);

  }

  updateSubscription(updatedSubscription: any) {
    console.log(updatedSubscription['subscriptionName']);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };
    return this.http.put<any>(`${this.url}/updateSubscription`, updatedSubscription, httpOptions);
  }

  deleteSubscription(subscription: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    const url = `${this.url}/deleteSubscription/${subscription.id}`;
    return this.http.delete<any>(url, httpOptions);
  }

}
