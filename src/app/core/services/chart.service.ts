import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public pieChart: any;
  public lineChart: any;
  public countryName: string = '';
  constructor(private router: Router) {}

  createLineChart(year: number[], medal: number[]) {
    const linechart = new Chart('linechart', {
      type: 'line',
      data: {
        labels: year,
        datasets: [
          {
            label: '',
            data: medal,
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  createPieChart(countries: string[], medal: number[]) {
    
    this.pieChart = new Chart('MyChart', {
      type: 'pie', 

      data: {
        labels: countries,
        datasets: [
          {
            label: '🏅',
            data: medal,
            backgroundColor: [
              '#5D9D08',
              '#9D7A08',
              '#9D2E08',
              '#08869D',
              '#30089D',
              '#93089D',
            ],
            hoverOffset: 10,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        onClick: (e) => {
          const points = this.pieChart.getElementsAtEventForMode(
            e,
            'nearest',
            { intersect: true },
            true
          );
          if (points.length) {
            const firstPoint = points[0];
            const datapoint = firstPoint.index;
            this.countryName = this.pieChart.data.labels[datapoint];
            this.router.navigate([`detail/${this.countryName}`]);
          }
        },
      },
    });
  }

}
