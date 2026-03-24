import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AngularSvgIconModule } from "angular-svg-icon";
import { CmMapComponent } from "src/app/shared/components/cm-map/cm-map.component";

@Component({
  selector: 'app-map-card',
  standalone: true,
  imports: [FormsModule, CommonModule, AngularSvgIconModule, CmMapComponent],
  templateUrl: './map-card.component.html',
  styleUrl: './map-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapCardComponent implements OnInit{

   @ViewChild('mapComponent') mapComponent!: CmMapComponent;
isMaximized = false;
   ngOnInit(): void {
 
   }
   toggleMaximize() {
    this.isMaximized = !this.isMaximized;
    
    // Crucial: Leaflet must re-calculate tiles for the new size
    setTimeout(() => {
      this.mapComponent.refresh();
    }, 300);
  }
 public refreshMap() {
    if (this.mapComponent) {
      this.mapComponent.refresh();
    }
  }
}

