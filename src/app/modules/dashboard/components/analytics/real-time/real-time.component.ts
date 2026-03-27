import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { color } from 'highcharts';
import { CmMapComponent } from "src/app/shared/components/cm-map/cm-map.component";

@Component({
  selector: 'app-real-time',
  standalone: true,
  imports: [FormsModule, CommonModule,AngularSvgIconModule, CmMapComponent],
  templateUrl: './real-time.component.html',
  styleUrl: './real-time.component.css',
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RealTimeComponent {
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


  MapBottomCards = [
  { count: 1, label: 'Act' , color:'#C10007', colorP:'#E7000B', bg:'#FEF2F2',border:'#FFC9C9'},
  { count: 1, label: 'Act' , color:'#CA3500', colorP:'#F54900', bg:'#FFF7ED',border:'#FFD6A8'},
  { count: 6, label: 'Act' , color:'#A65F00', colorP:'#D08700', bg:'#FEFCE8',border:'#FFF085'},
  { count: 4, label: 'Act' , color:'#008236', colorP:'#00A63E', bg:'#F0FDF4',border:'#B9F8CF'},


];
}
