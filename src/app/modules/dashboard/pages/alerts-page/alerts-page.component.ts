import { Component } from '@angular/core';
import { AlertCardComponent } from '../../components/alertsComponent/alert-card/alert-card.component';
import { Alert, AlertData, Severity, Status } from '../../models/alert.model';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from "angular-svg-icon";
import { MaterialModule } from "src/app/shared/Material.module";
import { TableFilterService } from 'src/app/modules/uikit/pages/table/services/table-filter.service';


@Component({
  selector: 'app-alerts-page',
  imports: [AlertCardComponent, CommonModule, AngularSvgIconModule, MaterialModule,AngularSvgIconModule],
  templateUrl: './alerts-page.component.html',
  styleUrl: './alerts-page.component.css',
})
export class AlertsPageComponent {
handleView($event: string) {
throw new Error('Method not implemented.');
}
handleNotify($event: string) {
throw new Error('Method not implemented.');
}
 constructor(public filterService: TableFilterService) {}

  onSearchChange(value: Event) {
    const input = value.target as HTMLInputElement;
    this.filterService.searchField.set(input.value);
  }

  onStatusChange(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    this.filterService.statusField.set(selectElement.value);
  }

  onOrderChange(value: Event) {
    const selectElement = value.target as HTMLSelectElement;
    this.filterService.orderField.set(selectElement.value);
  }
alerts: AlertData[] =[
  {
    id: 'AL-101',
    title: 'Critical Flood Warning',
    severity: 'CRITICAL',
    status: 'active',
    location: 'Ahmedabad - Ward 15, 18, 22',
    timestamp: '2026-03-12 14:30',
    threshold: 'Rainfall > 50mm/hr',
    sopName: 'SOP-FLOOD-001',
    sopId: '001',
    assignedTo: 'Emergency Response Team Alpha',
    triggeredBy: 'Automated System'
  },
  {
    id: 'AL-102',
    title: 'Heavy Rain Alert',
    severity: 'HIGH',
    status: 'active',
    location: 'Surat - Zone 3',
    timestamp: '2026-03-12 15:00',
    threshold: 'Rainfall > 30mm/hr',
    sopName: 'SOP-RAIN-002',
    sopId: '002',
    assignedTo: 'Rain Monitoring Team',
    triggeredBy: 'Weather API'
  },
  {
    id: 'AL-103',
    title: 'River Overflow Warning',
    severity: 'MEDIUM',
    status: 'active',
    location: 'Vadodara',
    timestamp: '2026-03-12 16:00',
    threshold: 'Water Level > 90%',
    sopName: 'SOP-RIVER-003',
    sopId: '003',
    assignedTo: 'Water Dept',
    triggeredBy: 'Sensor Data'
  },
  {
    id: 'AL-104',
    title: 'Dam Gate Release Alert',
    severity: 'MEDIUM',
    status: 'active',
    location: 'Narmada Dam',
    timestamp: '2026-03-12 17:00',
    threshold: 'Manual Trigger',
    sopName: 'SOP-DAM-004',
    sopId: '004',
    assignedTo: 'Dam Authority',
    triggeredBy: 'Manual'
  }
];
  alertsD: Alert[] = [
    {
      id: '1',
      title: 'Critical Flood Warning',
      severity: 'CRITICAL',
      status: 'active',
      location: 'Ahmedabad - Ward 15, 18, 22',
      timestamp: '2026-03-12 14:30',
      threshold: 'Rainfall > 50mm/hr',
      sopName: 'SOP-FLOOD-001',
      sopId: 'SF-001',
      assignedTo: 'Emergency Response Team Alpha',
      triggeredBy: 'Automated System'
    },
    {
      id: '2',
      title: 'Heat Wave Alert',
      severity: 'HIGH',
      status: 'active',
      location: 'Surat - Zone 3, 5',
      timestamp: '2026-03-12 13:15',
      threshold: 'Temperature > 42°C',
      sopName: 'SOP-HEAT-002',
      sopId: 'SH-002',
      assignedTo: 'Health & Safety Department',
      triggeredBy: 'Automated System'
    },
    {
      id: '3',
      title: 'Air Quality Deterioration',
      severity: 'MEDIUM',
      status: 'monitoring',
      location: 'Vadodara - Industrial Area',
      timestamp: '2026-03-12 12:00',
      threshold: 'AQI > 200',
      sopName: 'SOP-AIR-003',
      sopId: 'SA-003',
      assignedTo: 'Environmental Team',
      triggeredBy: 'IoT Sensor Network'
    }
  ];

  getSeverityClass(severity: Severity) {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-600 border-red-200';
      case 'HIGH': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  }

  getStatusClass(status: Status) {
    switch (status) {
      case 'active': return 'bg-red-500 text-white';
      case 'monitoring': return 'bg-blue-50 text-blue-600 border border-blue-200';
      case 'resolved': return 'bg-gray-100 text-gray-600 border border-gray-200';
      default: return 'bg-gray-100';
    }
  }
}
