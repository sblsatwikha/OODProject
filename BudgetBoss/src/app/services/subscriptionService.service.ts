import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, from, of, throwError } from "rxjs";
import { map, switchMap, flatMap } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import {Storage} from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { access } from "fs";
import { CookieService } from 'ngx-cookie-service';
@Injectable({
    providedIn: 'root'
  })
export class subscriptionService {
    
  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  checkUserObs:Observable<any> | undefined;
  uri:string = 'http://localhost:8081/api/subscription';
    access_token: string | string[] = [];
  constructor(
    private readonly storage:Storage,
    private readonly platform:Platform,
    private readonly http:HttpClient,
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
    this.setCookie();
    console.log(this.cookieService.getAll());
    const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        withCredentials: true
      };
    //   document.cookie = {'JWT-TOKEN': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdW1hbnRoMUBnbWFpbC5jb20iLCJpYXQiOjE2ODA5Nzg4ODksImV4cCI6MTY4MDk4MDY4OX0._Ao2GJx7Vbl_SsjQp56e0EkzVoyRNRHfdS2EG9qsEAs1mxi74fmxtV15aKRRa2opkHj-wTOioqJETkSk8CFVZg'}
    return this.http.get(`${this.uri}/getSubscriptions`,httpOptions);
  }
  setCookie() {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 30);
    this.cookieService.set('JWT-TOKEN', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzdW1hbnRoMUBnbWFpbC5jb20iLCJpYXQiOjE2ODA5OTkxNDEsImV4cCI6MTY4MTA4NTU0MX0.4yE7NhtUACb38Oknwv8JnLaqIXtYmUmXn3UaQPdRo3XtwYFV6jeXR7662BaJXKj_ulK16xF6VMvMNgxk4Rw5EA', expires, '/api', 'localhost', true, 'Lax');
  }
  

  
}
