import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-expense',
  templateUrl: './display-expense.page.html',
  styleUrls: ['./display-expense.page.scss'],
})
export class DisplayExpensePage implements OnInit {

  expenseDetails: any;
  expenseKeys: any;

  constructor(private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.expenseDetails = JSON.parse(data['expenseData'])
      this.expenseKeys = Object.keys(this.expenseDetails);
    })
  }

}
