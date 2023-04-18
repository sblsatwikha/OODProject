import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';
import { NgProgress } from 'ngx-progressbar';
import { expenseService } from '../services/expenseService.service';
import { categoryService } from '../services/categoryService.service';
import { AuthService } from '../services/AuthService.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  doughnutChart!: Chart;
  lineChart!:Chart;
  spend = 0;
  budget=1000;
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  date=new Date();
  expenseData: any[] = [];
  categoriesData: any[] = [];
  userEmailId: any;
  selectedDate=new Date();
  expensesThisMonth: any;
  fullName: any;
  
  constructor(private progress: NgProgress,private expenseService: expenseService,private categoryService: categoryService,private AuthService: AuthService) { }

  ngOnInit() {
    this.AuthService.getLoggedInUserData().then(data => {
      this.fullName = data.fullName
      this.userEmailId = data.emailId
    });
    this.selectedDate=new Date();
    this.getCategories();
    this.getExpenses();
   
   }
  prepareData(){
         // DATA FOR DONUT CHART
        
        let expenses=this.expenseData;
        const selectedMonth = new Date(this.selectedDate).getMonth() + 1; // getMonth() returns zero-indexed month, so adding 1 to get the actual month
        const selectedYear = new Date(this.selectedDate).getFullYear();

        this.expensesThisMonth = expenses.filter(expense => {
          const expenseMonth = new Date(expense.expenseDate).getMonth() + 1;
          const expenseYear = new Date(expense.expenseDate).getFullYear();
          return expenseMonth === selectedMonth && expenseYear === selectedYear;
        });

        console.log(this.expensesThisMonth);
        expenses=this.expensesThisMonth;
        let categoryExpenses = expenses.reduce((accumulator, expense) => {
          let category = expense.category;
          let expensePrice = expense.expensePrice;
          if(expense)
          accumulator[category] = accumulator[category] ? accumulator[category] + expensePrice : expensePrice;
          return accumulator;
        }, {});
        
        let categoryNames = Object.keys(categoryExpenses);
        let totalExpensesData = Object.values(categoryExpenses);
        console.log(categoryNames);
        console.log(totalExpensesData);
        
        this.createDoughnutchart(categoryNames,totalExpensesData);
        
        // DATA FOR LINE CHART
        let lineexpenses=this.expenseData;
        console.log(lineexpenses);
        // Create an array of months
        const months = Array.from({length: 12}, (_, i) => {
          const date = new Date();
          date.setMonth(i);
          return date.toLocaleString('default', { month: 'long' });
        });

        // Initialize an object to store the total expenses for each month
        const monthlyExpenses: Record<string, number> = {};

      
        for (const expense of lineexpenses) {
          const month = new Date(expense.expenseDate).getMonth();
          const monthName = months[month];
          if (monthlyExpenses[monthName]) {
            monthlyExpenses[monthName] += expense.expensePrice;
          } else {
            monthlyExpenses[monthName] = expense.expensePrice;
          }
        }

        // Create an array of total expenses for each month
        const monthlyExpenseArray = months.map((month) => monthlyExpenses[month] || 0);

        // Log the results
        console.log(months);
        console.log(monthlyExpenseArray);
        this.createLineChart(months,monthlyExpenseArray)

        // FOR PROGRESS BAR
        let totalSpent = 0;
      
        for (let i = 0; i < (totalExpensesData as number[]).length; i++) {
          totalSpent += (totalExpensesData as number[])[i];
        }
        console.log(totalSpent);
        this.spend=totalSpent;
      }
  createPieChart(categoryNames: string[],totalExpensesData: any[]) {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8C564B', '#00CC99', '#9966CC', '#FF9933', '#0099CC', '#FF99CC', '#6699CC', '#CCCCFF', '#CC6699'];

    const labelLength=categoryNames.length+1;
    const data = {
      labels: categoryNames,
      datasets: [
        {
          data: totalExpensesData,
          backgroundColor: colors.slice(0,labelLength),
          hoverBackgroundColor: colors.slice(0,labelLength)
        }]
    };

    const options = {
      responsive: true,
      legend: {
        position: 'bottom',
      }
    };

    const pieChart = new Chart('pie-chart', {
      type: 'pie',
      data: data,
      options: options
    });
    
  }
  
  createLineChart(months: string[],monthlyExpenseArray: number[]) {
    const data = {
      labels: months,
      datasets: [
        {
          label: 'My Monthly Spending',
          data: monthlyExpenseArray,
          fill: false,
          borderColor: '#4bc0c0'
        }]
    };

    const options = {
      responsive: true,
      legend: {
        position: 'bottom',
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    };
    if (this.lineChart) {
      this.lineChart.destroy();
    }
    this.lineChart= new Chart('line-chart', {
      type: 'line',
      data: data
    });
  }
  createDoughnutchart(categoryNames: string[],totalExpensesData: any[]){
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#8C564B', '#00CC99', '#9966CC', '#FF9933', '#0099CC', '#FF99CC', '#6699CC', '#CCCCFF', '#CC6699'];

    const labelLength=categoryNames.length+1;
    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: categoryNames,
        datasets: [{
          label: '',
          data: totalExpensesData,
          backgroundColor: colors.slice(0,labelLength),
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right'
          },
          title: {
            display: true,
            text: 'Category Spent '
          }
        }
      }
    };
    if (this.doughnutChart) {
      this.doughnutChart.destroy();
    }
    this.doughnutChart = new Chart('myChart', config);
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
        this.prepareData();
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
  onDateChanged(){
    this.getExpenses();
  }

  downloadReport(){
    const worksheet = XLSX.utils.json_to_sheet(this.expensesThisMonth);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.months[new Date(this.selectedDate).getMonth()] + new Date(this.selectedDate).getFullYear() + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
}
