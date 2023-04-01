import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import { ChartConfiguration } from 'chart.js';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  doughnutChart!: Chart;
  constructor() { }

  ngOnInit() {
    this.createPieChart();
    this.createLineChart();
    this.createDoughnutchart();
  }

  createPieChart() {
    const data = {
      labels: ['Clothing', 'Food', 'Entertainment'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#003f5c', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#003f5c', '#FFCE56']
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

  createLineChart() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My Spending',
          data: [65, 59, 80, 81, 56, 55, 40],
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

    const lineChart = new Chart('line-chart', {
      type: 'line',
      data: data
    });
  }
  createDoughnutchart(){
    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: ['Clothing', 'Food', 'Entertainment'],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
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

    this.doughnutChart = new Chart('myChart', config);
  }

}
