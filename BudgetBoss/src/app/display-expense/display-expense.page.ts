import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { subscriptionService } from '../services/subscriptionService.service';
import { expenseService } from '../services/expenseService.service';
import { categoryService } from '../services/categoryService.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-display-expense',
  templateUrl: './display-expense.page.html',
  styleUrls: ['./display-expense.page.scss'],
})
export class DisplayExpensePage implements OnInit {

  expenseDetails: any;
  categoriesData: any;
  expenseKeys: any;
  cyclesData: any;
  sendReminderData: any;
  isInitialized !: boolean;

  isSubscription!: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private subscriptionService: subscriptionService,
    private expensiveService: expenseService,
    private categoryService: categoryService,
    private alertCtrl: AlertController,
    private navController: NavController) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      
      if (!this.isInitialized) {
        console.log('Page entered for the first time');
        this.categoriesData = this.getCategories();
        
        this.isInitialized = true;
      } 
      this.cyclesData=[{
        "cycleName":"Daily",
        "value":"daily"
      },{
        "cycleName":"Weekly",
        "value":"weekly"
      },{
        "cycleName":"Monthly",
        "value":"monthly"
      },{
        "cycleName":"Yearly",
        "value":"yearly"
      }];
      this.expenseDetails = JSON.parse(data['expenseData'])
     
      this.isSubscription = JSON.parse(data['isSubscription'])
      this.expenseKeys = Object.keys(this.expenseDetails);
      

    })
  }
  getCategories(){
    this.categoryService.getAllCategoriesData().subscribe(
      (data: any) => {
        console.log(data);
        let newData = [];
        if (!(data instanceof Array)) {
          newData.push(data);
          this.categoriesData=newData;
        }else {
          this.categoriesData=data;
        }
       
      },
      (error: any) => {
        console.error(error);
       
      }
    );
  }
  updateDetails(){
    console.log(JSON.stringify(this.expenseDetails))
    if(this.isSubscription){
      this.subscriptionService.updateSubscription(this.expenseDetails).subscribe(data => {
        console.log(data.message)
        // this.router.navigate(['/tabs/tab3'])
        this.router.navigateByUrl('/tabs/tab3')
        // this.router.navigateByUrl('tab3', { replaceUrl: true });
        // this.showAlert(data)
        
      })
      // this.navCtrl.navigateRoot(['/tabs/tab3'])
      // this.router.navigate(['/tabs/tab3'])
      // this.router.navigateByUrl('/tabs/tab3')
    } 
    else{
      console.log("else")
      this.expensiveService.updateExpense(this.expenseDetails).subscribe(data => {
        console.log(data)
        this.navCtrl.navigateRoot(['/tabs/tab2'])
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
