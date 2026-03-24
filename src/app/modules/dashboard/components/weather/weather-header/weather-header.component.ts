import { Component, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TableFilterService } from 'src/app/modules/uikit/pages/table/services/table-filter.service';


@Component({
    selector: 'app-weather-header',
    templateUrl: './weather-header.component.html',
    styleUrls: ['./weather-header.css'],
    standalone: true,
    imports:[AngularSvgIconModule]
})
export class WeatherHeaderComponent implements OnInit {
  constructor(public filterService: TableFilterService) {}
 
   onSearchChange(value: Event) {
     const input = value.target as HTMLInputElement;
     this.filterService.searchField.set(input.value);
   }
 
   onStatusChange(value: Event) {
     const selectElement = value.target as HTMLSelectElement;
     this.filterService.statusField.set(selectElement.value);
   }

  ngOnInit(): void {}
}
