import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loginClicked(){
    this.router.navigateByUrl('tabs', { replaceUrl: true });
    // this.router.navigateByUrl('')
  }
  registerClicked(){
    this.router.navigateByUrl('register', { replaceUrl: true });
  }

}
