import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'detail/:country', component: LineChartComponent },
    { path: '**', component: NotFoundComponent }
];
