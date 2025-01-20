import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartService } from '../../core/services/chart.service';
import { OlympicService } from '../../core/services/olympic.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit, OnDestroy{
  
  medals: number[] = [];
  listCountry: string[] = [];
  numMedal: number[] = [];
  public numberOfCountries: number = 0;
  public numberOfJo: number = 0;
  private httpSubscription!: Subscription;
  public errorMessage: string ="";

  constructor(private chartService: ChartService, private olymoicService: OlympicService) {}
 
  ngOnInit(): void {
    this.chartData();
  }

  public chartData(): void {
    this.httpSubscription = this.olymoicService.loadInitialData().subscribe((result) => {
      let medalByCountry = new Map();

      for (let i = 0; i < result.length; i++) {
        this.numberOfJo += result[i].participations.length;
        let listMedal = result[i].participations.map((m) => m.medalsCount);
        let sumMedal = listMedal.reduce(
          (accumulator, currentValue) => accumulator + currentValue, 0
        );
        medalByCountry.set(result[i].country, sumMedal);
      }

      medalByCountry.forEach((value: number, key: string) => {
        this.numMedal.push(value);
        this.listCountry.push(key);
      });

      this.numberOfCountries = this.listCountry.length;
      this.chartService.createPieChart(this.listCountry, this.numMedal);
    }, (error) =>{
      this.errorMessage = error;
    });
  } 
  ngOnDestroy(): void {
    this.httpSubscription.unsubscribe();
  }
}
