import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private router: Router,private AuthService: AuthService,private toastController: ToastController) {
    this.registerForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullName:'',
      confirmPassword: ['', Validators.required],
    });
    
  }
  ngOnInit() {
  }
  onSubmit() {
    console.log(this.registerForm.value);
    
    let payload={
      phoneNumber: this.registerForm.value.phone,
      emailId: this.registerForm.value.email,
      fullName:this.registerForm.value.fullName,
      password:this.registerForm.value.password,
    }
    this.AuthService.registerUser(payload).subscribe(
      (data: any) => {
        console.log(data);
        this.registerForm.reset();
        // Success function
        this.presentToast(data.message);
        this.router.navigateByUrl('', { replaceUrl: true });
      },
      (error: any) => {
        console.error(error);
        this.presentToast(error.error.message);
        // Error function
      }
    );
  }
  async presentToast(message: string | '') {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }
}

