import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertData } from '../../../models/alert.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './alert-card.component.html',
  styleUrl: './alert-card.component.scss',
})
export class AlertCardComponent {
  @Input() alert!: AlertData;
  @Output() onViewDetails = new EventEmitter<string>();
  @Output() onNotify = new EventEmitter<string>();

  @Input() title: string = 'Active Alerts';
  @Input() mainValue: string | number = 0;
  @Input() cardColor: string  = '0';


  handleViewDetails() {
   this.onViewDetails.emit(this.alert.id);
  }

  handleNotify() {
    this.onNotify.emit(this.alert.id);
  }
}
