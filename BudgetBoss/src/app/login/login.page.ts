import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginService } from '../services/loginService.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  testData: [] = [];

  constructor(private router: Router,private loginService: loginService) { }

  ngOnInit() {
    this.getTestData();
  }

  loginClicked(){
    this.router.navigateByUrl('tabs', { replaceUrl: true });
    // this.router.navigateByUrl('')
  }
  registerClicked(){
    this.router.navigateByUrl('register', { replaceUrl: true });
  }
  getTestData() {
    console.log('service triggered');
    this.loginService.getTestCarData().
      subscribe((data: any) => {
        this.testData = data;
        console.log(data);
        
      });
  }
  onAddNewSubject() {
      const payload: any[] = [];
      this.loginService.testPostMethod(payload).subscribe((data: any) => {
        console.log(data.data.msg);
        
      });

  }
}
