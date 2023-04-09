import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PopoverController } from '@ionic/angular';
import { subscriptionService } from '../services/subscriptionService.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/AuthService.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild(IonModal) modal: any;
  userEmailId: any;

  constructor(public popoverController: PopoverController,
    private subscriptionService: subscriptionService,
    private cookieService: CookieService,
    private AuthService: AuthService
    ) {
  }


  // items = [
  //   { name: 'Apple iCloud', price: 10},
  //   { name: 'Google One', price: 20 },
  //   { name: 'Spotify Premium', price: 30},
  //   { name: 'Youtube Premium', price: 30}
  // ];
  // /subscription/getSubscriptions
  subscriptionsData = [ {
    subscriptionName:"",
    subscriptionPrice:""}
];
  subname: string="";
  price:any=0;
  billdate:Date=new Date();
  billcycle:string="";
  reminder:string="";
  note:string="";
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.subname, 'confirm');
    const newData={
      "emailId": this.userEmailId,
      "subscriptionName":this.subname,
      "subscriptionPrice":this.price,
      "billingCycle":this.billcycle,
      "billingDate":this.billdate,
      "sendReminder":this.reminder,
      "note":this.note,
      
    }
    this.subscriptionService.postNewSubscription(newData).subscribe((data: any) => {
      console.log(data)
      this.getSubData()
    });
    ;
  }
  
  ngOnInit() {
    this.AuthService.getLoggedInUserData().then(data => {
      this.userEmailId = data.emailId
    });
    this.getSubData();  
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      
    }
  }
  getSubData(){
    this.subscriptionService.getSubscriptionsData().subscribe(
      (data: any) => {
        console.log(data);
        let newData = [];
        if (!(data instanceof Array)) {
          newData.push(data);
          this.subscriptionsData=newData;
        }else {
          this.subscriptionsData=data;
        }
        
        // Success function
        // this.presentToast(data.message);
        // this.router.navigateByUrl('', { replaceUrl: true });
      },
      (error: any) => {
        console.error(error);
        // this.presentToast(error.error.message);
        // Error function
      }
    );
  }
  doRefresh(event: any){
    console.log(event);
    this.getSubData();
    setTimeout(() => {
      console.log('Refresh operation complete');
      event.target.complete();
    }, 2000);
  }

}
