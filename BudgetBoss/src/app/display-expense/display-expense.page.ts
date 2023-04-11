import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { subscriptionService } from '../services/subscriptionService.service';
import { expenseService } from '../services/expenseService.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-display-expense',
  templateUrl: './display-expense.page.html',
  styleUrls: ['./display-expense.page.scss'],
})
export class DisplayExpensePage implements OnInit {

  expenseDetails: any;
  expenseKeys: any;
  isSubscription!: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private subscriptionService: subscriptionService,
    private expensiveService: expenseService,
    private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.expenseDetails = JSON.parse(data['expenseData'])
      this.isSubscription = JSON.parse(data['isSubscription'])
      this.expenseKeys = Object.keys(this.expenseDetails);
    })
  }

  updateDetails(){
    if(this.isSubscription){
      this.subscriptionService.updateSubscription(this.expenseDetails).subscribe(data => {
        console.log(data.message)
        this.navCtrl.navigateRoot(['/tabs/tab3'])
      },
      (error: any) => {
        console.error(error);
      })
    } 
    else{
      this.expensiveService.updateExpense(this.expenseDetails).subscribe(data => {
        console.log(data.message)
        this.router.navigate(['/tabs/tab2'])
      },
      (error: any) => {
        console.error(error);
      })
    }
  }

  // async showAlert(data: any){
  //   const alert = await this.alertCtrl.create({  
  //     header: data.message,  
  //     buttons: [{
  //       text: 'OK',
  //       handler: () => {
  //         console.log('User clicked OK');
  //         this.router.navigate(['/tabs/tab2'])
  //       }
  //     }] 
  //   });  
  //   await alert.present();
  // }

}
