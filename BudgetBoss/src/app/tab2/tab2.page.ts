import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}
  items = [
    { name: 'Groceries', price: 10, description: 'Description of groceries' },
    { name: 'Movie Tickets', price: 20, description: 'Description of movie tickets' },
    { name: 'Cool Drinks', price: 30, description: 'Description of beverages' },
  ];
}
