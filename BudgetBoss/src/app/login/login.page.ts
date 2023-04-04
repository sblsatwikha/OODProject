import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginService } from '../services/loginService.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userData: [] = [];
  email:string="";
  password:string="";
  constructor(private router: Router,private loginService: loginService,private toastController: ToastController) { }

  ngOnInit() {
    // this.getTestData();
  }

  loginClicked(){
    let payload={
      emailId: this.email,
      password: this.password,
    }
    this.loginService.signInUser(payload).subscribe(
      (data: any) => {
        console.log(data);
        // Success function
        this.userData=data;
        this.messageToast(data.message);
        this.router.navigateByUrl('tabs', { replaceUrl: true });
      },
      (error: any) => {
        console.error(error);
        this.messageToast(error.error.message);
        // Error function
      }
    );

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
