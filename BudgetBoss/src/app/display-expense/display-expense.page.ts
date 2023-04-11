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
    console.log(JSON.stringify(this.expenseDetails))
    if(this.isSubscription){
      this.subscriptionService.updateSubscription(this.expenseDetails).subscribe(data => {
        console.log(data.message)
        // this.router.navigate(['/tabs/tab3'])
        // this.router.navigateByUrl('/tabs/tab3')

        // this.showAlert(data)
      })
      this.navCtrl.navigateRoot(['/tabs/tab3'])
      // this.router.navigate(['/tabs/tab3'])
      // this.router.navigateByUrl('/tabs/tab3')
    } 
    else{
      console.log("else")
      this.expensiveService.updateExpense(this.expenseDetails).subscribe(data => {
        console.log(data)
       
      })
    }
  }

  // async showAlert(data: any){
  //   const alert = await this.alertCtrl.create({  
  //     header: data.message,  
  //     buttons: ['OK']  
  //   });  
  //   await alert.present();
    
  // }

}
