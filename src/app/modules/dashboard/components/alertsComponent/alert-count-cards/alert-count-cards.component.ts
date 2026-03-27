import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { icon } from 'leaflet';

@Component({
  selector: 'app-alert-count-cards',
  imports: [CommonModule, MatIcon],
  templateUrl: './alert-count-cards.component.html',
  styleUrl: './alert-count-cards.component.css',
})
export class AlertCountCardsComponent {

   AlertsCountCards = [
  { count: 1, label: 'Critical Alerts' , color:'#E7000B',  border:'#FB2C36', icon:'warning'},
  { count: 3, label: 'High Priority' , color:'#F54900', border:'#FF6900',icon:'notifications'},
  { count: 1, label: 'Monitoring' , color:'#155DFC',  border:'#2B7FFF', icon:'schedule'},
  { count: 5, label: 'Resolved Today' , color:'#00A63E', border:'#00C950', icon:'check_circle'},


];
}
