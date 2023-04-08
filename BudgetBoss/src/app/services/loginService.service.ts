 import { Injectable } from "@angular/core";
  import { BehaviorSubject, Observable, from, of, throwError } from "rxjs";
  import { map, switchMap, flatMap } from "rxjs/operators";
  import { JwtHelperService } from "@auth0/angular-jwt";
  import {Storage} from '@ionic/storage';
  import { Platform } from '@ionic/angular';
  import { HttpClient } from '@angular/common/http';
  
  export class loginService {
      
    userInfo = new BehaviorSubject(null);
    jwtHelper = new JwtHelperService();
    checkUserObs:Observable<any> | undefined;
    uri:string = 'http://localhost:8081/api/auth';
    constructor(
      private readonly storage:Storage,
      private readonly platform:Platform,
      private readonly http:HttpClient
    ) {
      this.loadUserInfo();
    }
  
    loadUserInfo() {
      let readyPlatformObs = from(this.platform.ready());
  
      this.checkUserObs = readyPlatformObs.pipe(
        switchMap(() => {
            return from(this.getAccessToken());
        }),
        map((token) => {
          if(!token){
            return null;
          }
            var decodedUser = this.jwtHelper.decodeToken(token);
            this.userInfo.next(decodedUser);
            return true;
        }));
      
    }
  
    getAccessToken(){
      return this.storage.get("access_token");
    }
  
    getRefreshToke(){
      return this.storage.get("refresh_token");
    }
  
  //   callRefreshToken(payload){
  //     return this.http.post("http://localhost:3000/auth/refreshtoken", payload);
  //   }
    
  
    
    getTestCarData() {
      console.log('login service triggered');
      return this.http.get(`${this.uri}/vehicles/getallmakes?format=json`);
    }
    registerUser(data:any){
      return this.http.post(`${this.uri}/signup`, data);
    }
  //   signInUser(data:any){
  //     return this.http.post(`${this.uri}/signin`, data);
  //   }
    signInUser(payload: any): Observable<boolean> {
      if(payload && payload.emailId && payload.password){
        return this.http.post(this.uri,payload).pipe(
          map((response:any)=>{
            console.log(response);
            this.storage.set('access_token',response.access_token);
            this.storage.set('refresh_token', response.refresh_token);
            var decodedUser = this.jwtHelper.decodeToken(response.access_token);
            this.userInfo.next(decodedUser);
            console.log(decodedUser);
            return true;
          })
        )
      }
      
      return of(false);
    }
  }
  