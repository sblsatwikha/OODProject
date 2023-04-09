import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { PopoverController } from '@ionic/angular';
import { expenseService } from '../services/expenseService.service';
import { categoryService } from '../services/categoryService.service';
import { AuthService } from '../services/AuthService.service';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(IonModal) modal: any;
  expenseData: any[] = [];
  categoriesData: any[] = [];
  userEmailId: any;
  constructor(public popoverController: PopoverController,private expenseService: expenseService,private categoryService: categoryService,private AuthService: AuthService) {}
    
  ngOnInit() {
    this.AuthService.getLoggedInUserData().then(data => {
      this.userEmailId = data.emailId
    });
    this.getExpenses();
    this.getCategories();
   }
 
  // items = [
  //   { name: 'Groceries', price: 10,category:'Food', description: 'Description of groceries' },
  //   { name: 'Movie Tickets', price: 20,category:'Enterntainment', description: 'Description of movie tickets' },
  //   { name: 'Cool Drinks', price: 30,category:'Food', description: 'Description of beverages' },
  // ];

  
    
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
    let payload={
      "emailId":this.userEmailId,
      "expenseName":this.expname,
      "expensePrice":this.price,
      "expenseDate":this.expdate,
      "category":this.category,
      "description":this.description,
    }
  
    this.expenseService.saveExpense(payload).subscribe(
      (data: any) => {
        console.log(data);
        this.getExpenses();
        // Success function
    
      },
      (error: any) => {
        console.error(error);
      
        // Error function
      }
    );
    // this.items.push(newData)
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
  getExpenses(){
    this.expenseService.getAllExpensesData().subscribe(
      (data: any) => {
        console.log(data);
        let newData = [];
        if (!(data instanceof Array)) {
          newData.push(data);
          this.expenseData=newData;
        }else {
          this.expenseData=data;
        }
       
      },
      (error: any) => {
        console.error(error);

      }
    );
  }
  doRefresh(event: any){
    console.log(event);
    this.getExpenses();
    setTimeout(() => {
      console.log('Refresh operation complete');
      event.target.complete();
    }, 2000);
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

}
