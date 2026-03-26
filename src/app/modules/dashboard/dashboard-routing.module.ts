import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { WeatherComponent } from './pages/weather-page/weather.component';
import { AnalyticsComponent } from './pages/analytics-page/analytics.component';
import { AlertsPageComponent } from './pages/alerts-page/alerts-page.component';
import { ChatPageComponent } from './pages/chat-page/chat-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'weather', pathMatch: 'full' },
      { path: 'weather', component: WeatherComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'alerts', component: AlertsPageComponent },
      { path: 'chat', component: ChatPageComponent },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
