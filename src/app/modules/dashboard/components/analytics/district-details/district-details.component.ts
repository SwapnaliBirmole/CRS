import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DistrictData } from '../../../models/district.model.ts';

@Component({
  selector: 'app-district-details',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './district-details.component.html',
  styleUrl: './district-details.component.css',
})
export class DistrictDetailsComponent {
   @Input() data!: DistrictData;
  @Output() viewReport = new EventEmitter<string>();

  onViewReport() {
    this.viewReport.emit(this.data.name);
  }
}
