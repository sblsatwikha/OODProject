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
export class expenseService {

  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  checkUserObs: Observable<any> | undefined;
  url: string = 'http://localhost:8081/api/expense';
  access_token: string | string[] = [];
  constructor(
    private readonly storage: Storage,
    private readonly platform: Platform,
    private readonly http: HttpClient,
    private cookieService: CookieService

  ) {

  }



  getAllExpensesData() {
    console.log('Expense service triggered');
    console.log(this.cookieService.getAll());
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true
    };
    return this.http.get(`${this.url}/getExpenses`, httpOptions);
  }

  postNewExpense(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true
    };
    return this.http.post(`${this.url}/newExpense`, data, httpOptions);
  }

  updateExpense(expense: any){
    console.log(JSON.stringify(expense));
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      }),
      withCredentials: true
    };
    return this.http.put(`${this.url}/updateExpense`, httpOptions);
  }

  deleteExpense(expense: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true
    };

    const url = `${this.url}/deleteExpense/${expense.id}`;
    return this.http.delete<any>(url, httpOptions);
  }


}
