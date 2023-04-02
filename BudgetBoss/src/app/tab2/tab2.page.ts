import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonModal) modal: any;

  constructor(public popoverController: PopoverController) {}
    
 
  items = [
    { name: 'Groceries', price: 10,category:'Food', description: 'Description of groceries' },
    { name: 'Movie Tickets', price: 20,category:'Enterntainment', description: 'Description of movie tickets' },
    { name: 'Cool Drinks', price: 30,category:'Food', description: 'Description of beverages' },
  ];

  
    
  expname: string="";
  price:number=0;
  expdate:Date=new Date();
  category:string="";
  description:string="";
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.expname, 'confirm');
    const newData={
      "name":this.expname,
      "price":this.price,
      "expdate":this.expdate,
      "category":this.category,
      "description":this.description,
    }
    this.items.push(newData)
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.expname= "";
      this.price=0;
      this.expdate=new Date();
      this.category="";
      this.description="";
    }
  }

}
