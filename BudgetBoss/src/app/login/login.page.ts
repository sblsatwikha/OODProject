import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService.service';
import { ToastController } from '@ionic/angular';
import {Storage} from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userData: [] = [];
  email:string="";
  password:string="";
  constructor(private router: Router,private AuthService: AuthService,private toastController: ToastController,private readonly storage:Storage) { }

  ngOnInit() {
    // this.getTestData();
  }

  loginClicked(){
    let payload={
      emailId: this.email,
      password: this.password,
    }

    this.AuthService.signInUser(payload)
    .subscribe(value => {
      if(value){
        console.log(this.AuthService.getAccessToken());
        this.router.navigateByUrl('tabs', { replaceUrl: true });
      }
      else{
        alert('login fails')
      }
    },error => {
      console.log(error)
      alert('login fails')
    })
    // this.router.navigateByUrl('')
  }
  registerClicked(){
    this.router.navigateByUrl('register', { replaceUrl: true });
  }
  async messageToast(message: string | '') {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }
}
