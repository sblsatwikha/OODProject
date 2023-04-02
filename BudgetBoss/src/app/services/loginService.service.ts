import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })
export class loginService {
    uri:string = 'https://vpic.nhtsa.dot.gov/api';

  constructor(private http: HttpClient) { }

  getTestCarData() {
    console.log('login service triggered');
    return this.http.get(`${this.uri}/vehicles/getallmakes?format=json`);
  }
  testPostMethod(data:any){
    return this.http.post(`${this.uri}/New`, data);
  }
  }
