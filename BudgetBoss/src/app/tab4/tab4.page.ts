import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from '../services/AuthService.service';
import { budgetService } from '../services/budgetService.service';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PopoverController } from '@ionic/angular';
export interface BudgetData {
  budget: number;

}
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})

export class Tab4Page implements OnInit {
  @ViewChild(IonModal) modal: any;
  userData ={
    fullName:"",
    emailId:"",
    phoneNumber:"",
    budget:0
  }

  constructor(private AuthService: AuthService,private router: Router,private BudgetService: budgetService) { 
    
  }

  ngOnInit() {
    this.AuthService.getLoggedInUserData().then(data => {
      this.userData.fullName=data.fullName;
      this.userData.emailId=data.emailId;
      this.userData.phoneNumber=data.phoneNumber;

    });
    this.getBudget();
  }
  // ionViewWillEnter(){
  //   const userData= this.AuthService.getLoggedInUserData();
  // }
  logout(){
    alert("logout")
    this.router.navigateByUrl('', { replaceUrl: true });
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.userData.budget, 'confirm');
    let newBudget={
      "emailId":this.userData.emailId,
      "budget":this.userData.budget
    }
    console.log(newBudget);
    this.BudgetService.updateBudget(newBudget).subscribe((data: any) => {
      this.getBudget();
    });
    ;
  }
  getBudget(){
    this.BudgetService.getBudgetData().subscribe((data2: Object) => {
      this.userData.budget = (<BudgetData>data2).budget;
    });
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {

    }
  }
}
