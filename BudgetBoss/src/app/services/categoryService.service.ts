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
export class categoryService {
    
  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  checkUserObs:Observable<any> | undefined;
  uri:string = 'http://localhost:8081/api/category';
    access_token: string | string[] = [];
  constructor(
    private readonly storage:Storage,
    private readonly platform:Platform,
    private readonly http:HttpClient,
    private cookieService: CookieService
    
  ) {
    
  }



getAllCategoriesData() {
    console.log('Expense service triggered');
    console.log(this.cookieService.getAll());
    const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        withCredentials: true
      };
    return this.http.get(`${this.uri}/getAllCategories`,httpOptions);
  }
 

  
}