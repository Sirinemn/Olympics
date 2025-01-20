import { Component, importProvidersFrom } from '@angular/core';
import { MainComponent } from "../../components/main/main.component";
import { PieChartComponent } from "../../components/pie-chart/pie-chart.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainComponent, 
    PieChartComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


}
