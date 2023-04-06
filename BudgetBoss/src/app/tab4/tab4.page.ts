import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/AuthService.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  userData ={
    fullName:"",
    emailId:"",
    phoneNumber:"",
  }
  
  constructor(private AuthService: AuthService) { 
    
  }

  ngOnInit() {
    this.AuthService.getLoggedInUserData().then(data => {
      this.userData=data;
      const fullName = data.fullName;
      console.log(fullName);
    });
    
  }
  // ionViewWillEnter(){
  //   const userData= this.AuthService.getLoggedInUserData();
  // }
logout(){
  alert("logout")
}
}
