import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DistrictData } from '../../../models/district.model.ts';
import { AngularSvgIconModule } from "angular-svg-icon";
import { MaterialModule } from "src/app/shared/Material.module";

@Component({
  selector: 'app-district-details',
  standalone:true,
  imports: [CommonModule, AngularSvgIconModule, MaterialModule],
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
