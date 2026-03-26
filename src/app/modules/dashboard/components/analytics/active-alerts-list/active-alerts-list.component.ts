import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertItem } from '../../../models/alert.model';


@Component({
  selector: 'app-active-alerts-list',
  imports: [CommonModule],
  templateUrl: './active-alerts-list.component.html',
  styleUrl: './active-alerts-list.component.css',
})
export class ActiveAlertsListComponent {
   @Input() districtName: string = 'Ahmedabad';
  @Input() alerts: AlertItem[] = [];

  get totalAlerts(): number {
    return this.alerts.length;
  }

  onViewDetail(alert: AlertItem) {
    console.log('Viewing alert details for:', alert.title);
  }
}
