import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
  })
export class loginService {
    uri:string = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

  getTestCarData() {
    console.log('login service triggered');
    return this.http.get(`${this.uri}/vehicles/getallmakes?format=json`);
  }
  registerUser(data:any){
    return this.http.post(`${this.uri}/signup`, data);
  }
  signInUser(data:any){
    return this.http.post(`${this.uri}/signin`, data);
  }
  }
