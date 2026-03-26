import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WidgetCardComponent } from '../../components/analytics/widget-card/widget-card.component';
import { ForecastChartComponent } from "../../components/analytics/forecast-chart/forecast-chart.component";
import { RealTimeComponent } from '../../components/analytics/real-time/real-time.component';
import { DistrictDetailsComponent } from "../../components/analytics/district-details/district-details.component";
import { ActiveAlertsChartComponent } from "../../components/analytics/active-alerts-chart/active-alerts-chart.component";
import { ActiveAlertsListComponent } from "../../components/analytics/active-alerts-list/active-alerts-list.component";
import { RiskChartComponent } from '../../components/analytics/risk-chart/risk-chart.component';
import { AlertItem } from '../../models/alert.model';
import { DistrictData } from '../../models/district.model.ts';
// Define the interfaces here (or import them from a shared file)
interface StatFooterItem {
  label: string;
  value: number | string;
}

interface StatCardData {
  title: string;
  cardColor: string;
  mainValue: string | number;
  progressPercent: number;
  iconClass: string;
  iconColor: string;
  iconShadow: string;
  trendValue?: string;
  footerItems: StatFooterItem[];
  trendIcon:string;
  trendColor:string;
}

@Component({
  selector: 'app-analytics',
  imports: [CommonModule, WidgetCardComponent, ForecastChartComponent, RealTimeComponent, DistrictDetailsComponent, ActiveAlertsChartComponent, ActiveAlertsListComponent, RiskChartComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css',
})
export class AnalyticsComponent {
 widgetList: StatCardData[] = [
    {
      title: 'Active Alerts',
      cardColor: 'linear-gradient(135deg, rgba(251, 44, 54, 0.05) 0%, rgba(231, 0, 11, 0.05) 100%)',
      mainValue: 24,
      trendValue: '+3 today',
      trendColor: '#E7000B',
      trendIcon: 'assets/icons/uparrow.svg',
      progressPercent: 70,
      iconClass: 'warning_amber',
      iconColor: 'linear-gradient(135deg, #FB2C36 0%, #E7000B 100%)',
      iconShadow: '0 10px 15px -3px rgba(251, 44, 54, 0.30), 0 4px 6px -4px rgba(251, 44, 54, 0.30)',
      footerItems: [
        { label: 'Act', value: 1 },
        { label: 'Ready', value: 1 },
        { label: 'Watch', value: 6 },
        { label: 'Normal', value: 4 }
      ]
    },
    {
      title: 'Rainfall Forecast',
      cardColor: 'linear-gradient(135deg, rgba(43, 127, 255, 0.05) 0%, rgba(21, 93, 252, 0.05) 100%)',
      mainValue: '98%',
      trendValue: 'Next 24h',
       trendColor: '#155DFC',
       trendIcon: 'assets/icons/uparrow.svg',
      progressPercent: 50,
      iconClass: 'rainy',
      iconColor: 'linear-gradient(135deg, #2B7FFF 0%, #155DFC 100%)',
      iconShadow: '0 10px 15px -3px rgba(43, 127, 255, 0.30), 0 4px 6px -4px rgba(43, 127, 255, 0.30)',
      footerItems: [
        { label: 'Ward-level predictions available', value: '' }
      ]
    },
    {
      title: 'Heat Index',
       cardColor: 'linear-gradient(135deg, rgba(255, 105, 0, 0.05) 0%, rgba(245, 73, 0, 0.05) 100%)',
      mainValue: '42°C',
       trendValue: 'Next 24h',
        trendColor: '#F54900',
        trendIcon: 'assets/icons/uparrow.svg',
      progressPercent: 70,
      iconClass: 'mode_heat',
      iconColor: 'linear-gradient(135deg, #FF6900 0%, #F54900 100%)',
      iconShadow: '0 10px 15px -3px rgba(255, 105, 0, 0.30), 0 4px 6px -4px rgba(255, 105, 0, 0.30)',
      footerItems: [
        { label: 'Heat wave alert in 3 zones', value: '' }
      ]
    },
    {
      title: 'Air Quality Index',
       cardColor: 'linear-gradient(135deg, rgba(173, 70, 255, 0.05) 0%, rgba(152, 16, 250, 0.05) 100%)',
      mainValue: '156',
      trendValue: 'Next 24h',
       trendColor: '#9810FA',
       trendIcon: 'assets/icons/uparrow.svg',
      progressPercent: 50,
      iconClass: 'air',
      iconColor: 'linear-gradient(135deg, #AD46FF 0%, #9810FA 100%)',
      iconShadow: '0 10px 15px -3px rgba(173, 70, 255, 0.30), 0 4px 6px -4px rgba(173, 70, 255, 0.30)',
      footerItems: [
        { label: 'Updated 5 minutes ago', value: '' }
      ]
    }
    // Add more objects here to automatically generate more cards
  ];

currentDistrict: DistrictData = {
  name: 'Ahmedabad',
  riskLevel: 'HIGH',
  activeAlerts: 8,
  rainfall: { value: 145, unit: 'mm' },
  temperature: { value: 42, unit: '°C' },
  aqi: 156,
  population: '8.4M'
};
alertsData: AlertItem[] = [
  { id: 1, title: 'Flash Flood', location: 'Ward 42', timeAgo: '2 hours ago', status: 'Active', severityColor: '#ef4444' },
  { id: 2, title: 'Heat Wave', location: 'Zone 3', timeAgo: '4 hours ago', status: 'Monitoring', severityColor: '#f97316' },
  { id: 3, title: 'Air Quality Alert', location: 'Central', timeAgo: '6 hours ago', status: 'Resolved', severityColor: '#facc15' }
];
handleReport(cityName: string) {
  console.log('Opening report for:', cityName);
}
}
