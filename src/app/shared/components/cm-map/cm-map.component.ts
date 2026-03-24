import { Component } from '@angular/core';
import * as L from 'leaflet';
import { LeafletModule } from '@bluehalo/ngx-leaflet'; 
import 'leaflet-fullscreen';
declare module 'leaflet' {
  interface Map {
    toggleFullscreen(): void;
    isFullscreen(): boolean;
  }
}
@Component({
  selector: 'app-cm-map',
 imports: [LeafletModule ], 
  templateUrl: './cm-map.component.html',
  styleUrl: './cm-map.component.css',
  standalone: true
})

export class CmMapComponent {
   // Define constants for the initial view
  private readonly DEFAULT_LAT = 51.505;
  private readonly DEFAULT_LNG = -0.09;
  private readonly DEFAULT_ZOOM = 13;
  options = {
    zoomControl: false, // Hides the default Leaflet +/- buttons
    // fullscreenControl: true, 
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; [OpenStreetMap](http://www.openstreetmap.org/copyright) contributors'
      })
    ],
    zoom: this.DEFAULT_ZOOM,
    center: L.latLng(this.DEFAULT_LAT, this.DEFAULT_LNG)
  };
 public map!: L.Map; 
 isMaximized = false;
  // map.component.ts
onMapReady(map: L.Map) {
  this.map = map; 
 if ((L.Control as any).Fullscreen && !(this.map as any).fullscreenControl) {
      const fsControl = new (L.Control as any).Fullscreen({
        position: 'topleft'
      });
      this.map.addControl(fsControl);
      (this.map as any).fullscreenControl = fsControl; 
    }
  setTimeout(() => {
    map.invalidateSize();
  }, 100);
}

public refresh() {
    if (this.map) {
      this.map.invalidateSize();
    }
  }
 // Expose Leaflet methods to parents
  zoomIn() { this.map.zoomIn();}
  zoomOut() { this.map.zoomOut(); }
  resetView() { 
    this.map.setView([this.DEFAULT_LAT, this.DEFAULT_LNG], this.DEFAULT_ZOOM);
    this.map.invalidateSize(); // Also fixes the "grey tiles" issue!
  }
  
public toggleFullscreen() {
    console.log('Toggle Fullscreen Triggered');
    if (this.map) {
      // Use the interface method we declared above
       if ((this.map as any).fullscreenControl) {
        (this.map as any).toggleFullscreen();
      } else {
        // Fallback: If for some reason the plugin method fails, 
        // we can try to find the control manually or log a specific error
        console.error("Fullscreen control is not initialized on the map instance.");
      }
      
      setTimeout(() => {
        this.map.invalidateSize();
      }, 300);
    } else {
      console.error('Map instance not found!');
    }
  }

toggleMaximize() {
    this.isMaximized = !this.isMaximized;
    
    // Crucial: Leaflet must re-calculate tiles for the new size
    setTimeout(() => {
      this.refresh();
    }, 300);
  }


}
