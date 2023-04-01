import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  @ViewChild(IonModal) modal: any;

  constructor(public popoverController: PopoverController) {
    
  }
  items = [
    { name: 'Apple iCloud', price: 10},
    { name: 'Google One', price: 20 },
    { name: 'Spotify Premium', price: 30},
    { name: 'Youtube Premium', price: 30}
  ];

  subname: string="";
  price:number=0;
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
      "name":this.subname,
      "price":this.price,
      "billdate":this.billdate,
      "billcycle":this.billcycle,
      "reminder":this.reminder,
      "note":this.note,
    }
    this.items.push(newData)
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      
    }
  }

}
