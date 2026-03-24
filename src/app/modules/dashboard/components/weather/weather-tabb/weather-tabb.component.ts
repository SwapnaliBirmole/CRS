import {Component, ViewChild} from '@angular/core';
import {MatTabChangeEvent, MatTabsModule} from '@angular/material/tabs';
import { AngularSvgIconModule } from "angular-svg-icon";
import { MapCardComponent } from "../map-card/map-card.component";
@Component({
  selector: '[weather-tabb]',
  imports: [MatTabsModule, AngularSvgIconModule, MapCardComponent],
  templateUrl: './weather-tabb.component.html',
  styleUrl: './weather-tabb.component.css',
})
export class WeatherTabbComponent {

 @ViewChild('mapCard') mapCard!: MapCardComponent;
  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 1) { // Index of your map tab
      setTimeout(() => {
        this.mapCard.refreshMap();
      }, 250); // Wait for Material animation to finish
    }
  }
}
