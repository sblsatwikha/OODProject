import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {

  constructor() { }

  ngOnInit() {
    this.createPieChart();
    this.createLineChart();
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
        position: 'left',
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
          label: 'My First dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'My Second dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }]
    };

    const options = {
      responsive: true,
      legend: {
        position: 'top',
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

}
