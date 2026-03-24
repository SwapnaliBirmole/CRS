import { CommonModule, isPlatformBrowser } from '@angular/common';
// import { SessionService } from '../../services/common/session.service';
import { firstValueFrom } from 'rxjs';
// import { SurveillanceService } from '../../services/atcs/surveillance.service';
// import { PramglobalService } from '../../services/admin/pramglobal.service';
import { Component, Inject, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, PLATFORM_ID, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cm-leaflet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cm-leaflet.component.html',
  styleUrls: ['./cm-leaflet.component.css']
})
export class CmLeafletComponent implements OnInit, OnChanges {
  private map: any;
  private L: any;
  private drawnItems: any;
  private markerCluster: any;
  safeUrl: any = null;
  // pramglobalService = inject(PramglobalService);
  // surveillanceService = inject(SurveillanceService);
  sanitizer = inject(DomSanitizer);
  isBrowser = false;

  @Input() showMap = true;
  @Input() projectName: string = '';
  @Input() enableDraw: boolean = true;
  @Input() existingPolygon: string | null = null;
  @Input() labelList: any[] = [];
  @Input() siteData: any[] = [];
  @Input() popupData: { [siteId: string]: any } = {};
  @Input() useMarkerCluster: boolean = true;

  @Output() polygonDrawn = new EventEmitter<any>();
  @Output() markerClicked = new EventEmitter<string>();

  sites: any[] = [];
  markerMap: Map<string, any> = new Map();
  private isFirstPlot = true;
  private boundsSet = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async ngOnInit() {

    // debugger;
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.isBrowser) return;

    // 1️⃣ Dynamic Leaflet import
    const leaflet = await import('leaflet');
    this.L = leaflet.default ?? leaflet;
    await import('leaflet-draw');

    // 2️⃣ Initialize Map
    this.map = this.L.map('map').setView([51.505, -0.09], 13);
    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(this.map);

    // 3️⃣ Initialize Marker Cluster if enabled
    if (this.useMarkerCluster) {
      await import('leaflet.markercluster');
      if (this.L && (this.L as any).markerClusterGroup) {
        this.markerCluster = (this.L as any).markerClusterGroup({
          maxClusterRadius: 50,
          showCoverageOnHover: true,
          zoomToBoundsOnClick: true,
          iconCreateFunction: (cluster: any) => {
            const children = cluster.getAllChildMarkers();
            const count = cluster.getChildCount();

            // Try to find a representative icon from children
            let iconUrl = 'assets/img/pa_blue.png'; // Default fallback
            if (children.length > 0) {
              const firstChild = children[0];
              if (firstChild.options.icon && firstChild.options.icon.options.iconUrl) {
                iconUrl = firstChild.options.icon.options.iconUrl;
              }
            }

            return this.L.divIcon({
              html: `
                <div class="custom-cluster-container">
                  <img src="${iconUrl}" class="cluster-base-icon">
                  <span class="cluster-count-label">${count}</span>
                </div>
              `,
              className: 'custom-cluster-icon',
              iconSize: this.L.point(28, 28)
            });
          }
        });
        this.map.addLayer(this.markerCluster);
      }
    }

    // 3️⃣ Enable drawing if configured
    if (this.enableDraw) this.addDrawControl();
    // debugger;
    // 4️⃣ Render existing polygon
    if (this.existingPolygon) this.renderExistingPolygon(this.existingPolygon);

    // 5️⃣ Plot markers
    this.initialPlot();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.isBrowser || !this.map) return;

    if (changes['siteData'] && !changes['siteData'].isFirstChange()) {
      console.log("🔄 siteData changed, updating map markers surgically...");
      // this.clearMarkers(); // Removed to prevent flickering and closing popups
      this.initialPlot();
    }

    if (changes['existingPolygon'] && !changes['existingPolygon'].isFirstChange()) {
      console.log("🔄 existingPolygon changed, updating map zones...");
      this.clearPolygons();
      if (this.existingPolygon) {
        this.renderExistingPolygon(this.existingPolygon);
      }
    }
  }

  private initialPlot() {
    // if (!this.siteData?.length) return;

    console.log("Plotting sites for project:", this.projectName);
    const project = this.projectName?.toLowerCase();

    if (this.siteData?.length) {
      if (project === 'pa' || project === 'vms' || project === 'itms' || project === 'ivms') {
        this.plotSitesForPA(this.siteData);
      } else if (project === 'envr') {
        this.plotSitesForENVR(this.siteData);
      } else {
        this.plotSites();
      }
    }

    // Fallback: If no sites focused (e.g. no sites or bounds logic skipped), but we have a polygon, zoom to it.
    if (!this.boundsSet && this.drawnItems && this.drawnItems.getLayers().length > 0) {
      this.map.fitBounds(this.drawnItems.getBounds(), { padding: this.projectName?.toLowerCase() === 'vms' ? [150, 150] : [30, 30] });
      this.boundsSet = true;
    }
  }

  private clearMarkers() {
    if (this.markerMap) {
      this.markerMap.forEach(marker => {
        if (this.map.hasLayer(marker)) {
          this.map.removeLayer(marker);
        }
      });
      this.markerMap.clear();
    }

    if (this.markerCluster) {
      this.markerCluster.clearLayers();
    }

    this.sites = [];
  }

  private clearPolygons() {
    if (this.drawnItems) {
      this.drawnItems.clearLayers();
    }
  }


  private generatePaSitePopup(site: any): string {
    const statusColor = site.isReachable ? '#27ae60' : '#e74c3c';

    return `
    <div style="padding: 5px; min-width: 220px;">
      <h6 style="margin: 0 0 10px 0; color: #2c3e50; border-bottom: 2px solid ${statusColor}; padding-bottom: 5px; text-transform:capitalize">
        ${site.name || 'Unknown Site'}
      </h3>
      <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
        ${this.createPopupRow('Status', site.Status, statusColor, true)}
        ${this.createPopupRow('Site ID', site.id)}
        ${this.createPopupRow('SIP Name', site.sipName)}
        ${this.createPopupRow('Extension', site.extension)}
        ${this.createPopupRow('Zone', site.zoneNames || 'None')}
        ${this.createPopupRow('Groups', site.groupNames || 'None')}
        ${this.createPopupRow('Lat', site.lat)}
        ${this.createPopupRow('Long', site.lon)}
        ${this.createPopupRow('Reachable', site.isReachable ? 'Yes' : 'No')}
      </table>
    </div>
  `;
  }

  private generateENVRSitePopup(site: any): string {
    // Use 'online' status for color logic based on your mapping
    const statusColor = site.status ? '#27ae60' : '#e74c3c';

    return `
    <div style="padding: 10px; min-width: 250px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <h6 style="margin: 0 0 10px 0; color: #2c3e50; border-bottom: 2px solid ${statusColor}; padding-bottom: 5px; font-size: 14px; font-weight: bold; text-transform:capitalize">
        ${site.name || 'Unknown Site'}
      </h6>
      
      <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
        ${this.createPopupRow('Status', site.status, statusColor, true)}
        
        <tr style="background-color: #f8f9fa;"><td colspan="2" style="padding: 4px 0; font-weight: bold; color: #34495e;">Parameters:</td></tr>
        ${this.createPopupRow('AQI', site.aqi)}
        ${this.createPopupRow('Temp', site.temp ? `${site.temp} °C` : '-')}
        ${this.createPopupRow('Humidity', site.humid ? `${site.humid} %` : '-')}
        ${this.createPopupRow('PM 2.5', site.pm25)}
        ${this.createPopupRow('PM 10', site.pm10)}
        ${this.createPopupRow('Noise', site.noise ? `${site.noise} dB(A)` : '-')}
        
        <tr style="border-top: 1px solid #eee;"><td colspan="2" style="padding: 4px 0;"></td></tr>
        ${this.createPopupRow('Zone', site.zoneNames || 'None')}

      </table>

      <div style="margin-top: 8px; font-size: 10px; color: #7f8c8d; text-align: right;">
        ID: ${site.id}
      </div>
    </div>
  `;
  }

  private generateVMSSitePopup(site: any): string {
    const statusColor = site.networkStatus ? '#27ae60' : '#e74c3c';
    const snapshotHtml = site.snapshot_img ? `
    <div style="margin-bottom: 10px; text-align: center;">
      <img src="${site.snapshot_img}" style="width: 100%; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-height: 150px; object-fit: cover;" alt="Snapshot">
      ${site.snapTime ? `<div style="font-size: 10px; color: #7f8c8d; margin-top: 2px;">Captured: ${site.snapTime}</div>` : ''}
    </div>
  ` : (site.noSnapshot ? `<div style="margin-bottom: 10px; text-align: center; color: #7f8c8d; font-size: 11px; padding: 10px; background: #f8f9fa; border-radius: 4px;">No Snapshot Available</div>` : '');

    return `
    <div style="padding: 5px; min-width: 240px;">
      ${snapshotHtml}
      <h6 style="margin: 0 0 10px 0; color: #2c3e50; border-bottom: 2px solid ${statusColor}; padding-bottom: 5px; text-transform:capitalize">
        ${site.name || 'Unknown Site'}
      </h6>
      <table style="width: 100%; font-size: 12px; border-collapse: collapse;">
        ${this.createPopupRow('Status', site.status || site.Status, statusColor, true)}
        ${this.createPopupRow('VmsID', site.vmsId)}
        ${this.createPopupRow('IP Address', site.ipAddress)}
          ${this.createPopupRow('SiteId', site.siteId || 'None')}
        
        ${this.createPopupRow('Height', site.height)}
        ${this.createPopupRow('Width', site.width || 'None')}

   
        ${this.createPopupRow('Lat', site.lat)}
        ${this.createPopupRow('Long', site.lon)}
    
      </table>
    </div>
  `;
  }

  // Helper to keep the code clean
  private createPopupRow(label: string, value: any, color: string = '#2c3e50', isBold: boolean = false): string {
    return `
    <tr style="border-bottom: 1px solid #f1f1f1;">
      <td style="padding: 6px 0; color: #7f8c8d; font-weight: 500; text-transform:capitalize">${label}</td>
      <td style="padding: 6px 0; text-align: right; color: ${color}; font-weight: ${isBold ? 'bold' : 'normal'};">
        ${value ?? '-'}
      </td>
    </tr>
  `;
  }

  private getStatusIcon(status: string): string {
    const iconPath = 'assets/img/';
    const s = status?.toLowerCase().trim();

    // 1. Ongoing Category
    if (s === 'up' || s === 'ringing') {
      return `${iconPath}pa_green.png`;
    }

    // 2. Registered / Online Category (Blue Icon)
    // Including your new cases: hangup, transferred, hold, etc.
    const registeredCases = [
      'registered', 'ring',
      'hangup', 'transferred', 'hold', 'unreachable', 'reachable',
      'lagged', 'down', 'rsrvd', 'offhook', 'dialing', 'busy',
      'dialing offhook', 'pre-ring'
    ];

    if (registeredCases.includes(s)) {
      return `${iconPath}pa_blue.png`;
    }

    // 3. Unregistered / Offline Category (Grey Icon)
    const offlineCases = [
      'unregistered', 'offline', 'device not configured', 'rejected', 'register', 'not configured'
    ];

    if (offlineCases.includes(s)) {
      return `${iconPath}pa_grey.png`;
    }

    // Default fallback
    return `${iconPath}pa_grey.png`;
  }

  private getVmsStatusIcon(status: string): string {
    debugger;
    const iconPath = 'assets/img/';
    // Normalize the string (converts 'Online' to 'online')
    const s = status?.toLowerCase().trim();

    // 1. Online / Connected (Green Icon)
    if (s === 'online') {
      return `${iconPath}icon-green.png`;
    }

    // 2. Offline / Disconnected (Grey Icon)
    if (s === 'offline' || s === 'unknown') {
      return `${iconPath}icon-red.png`;
    }

    // Default fallback (assume offline if status is missing or unrecognized)
    return `${iconPath}pa_grey.png`;
  }

  private getAirQualityStatusIcon(status: string): string {
    debugger;
    const iconPath = 'assets/img/';
    // Normalize the string (converts 'Online' to 'online')
    const s = status?.toLowerCase().trim();

    // 1. Online / Connected (Green Icon)
    if (s === 'online') {
      return `${iconPath}icon_airQuality_green.svg`;
    }

    // 2. Offline / Disconnected (Grey Icon)
    if (s === 'offline' || s === 'unknown') {
      return `${iconPath}icon_airQuality_red.svg`;
    }

    // Default fallback (assume offline if status is missing or unrecognized)
    return `${iconPath}pa_grey.png`;
  }
  private getitmsStatusIcon(status: string): string {
    debugger;
    const iconPath = 'assets/img/';
    // Normalize the string (converts 'Online' to 'online')
    const s = status?.toLowerCase().trim();

    // 1. Online / Connected (Green Icon)
    if (s === 'online') {
      return `${iconPath}icon_surveillance1.svg`;
    }

    // 2. Offline / Disconnected (Grey Icon)
    if (s === 'offline' || s === 'unknown') {
      return `${iconPath}icon_surveillance1_red.svg`;
    }

    // Default fallback (assume offline if status is missing or unrecognized)
    return `${iconPath}icon_surveillance1.svg`;
  }

  private plotSitesForPA(sites: any[]): void {
    if (!this.map || !this.L) return;

    const bounds = this.L.latLngBounds([]);
    const currentSiteIds = new Set<string>();
    this.sites = sites;

    for (const site of sites) {
      const lat = parseFloat(site.lat);
      const lng = parseFloat(site.lon);
      if (isNaN(lat) || isNaN(lng)) continue;

      const siteId = site.name; // Using name as unique key as per existing logic
      currentSiteIds.add(siteId);

      const latlng = this.L.latLng(lat, lng);
      bounds.extend(latlng);

      const status = site.status || site.Status;
      const iconUrl = this.getIconByProject(status);
      const icon = this.L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [0, -25],
        className: 'custom-map-icon'
      });

      const tooltipHtml = `
        <div style="padding: 4px; line-height: 1.4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="font-weight: bold; font-size: 13px; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.2); margin-bottom: 4px; padding-bottom: 2px;">
            ${site.name}
          </div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.85); display: flex; align-items: center;">
            <span style="margin-right: 4px;">Status:</span>
            <span style="font-weight: 600; color: #fff;">${status || 'N/A'}</span>
          </div>
        </div>
      `;

      let marker = this.markerMap.get(siteId);

      if (marker) {
        // UPDATE EXISTING
        marker.setLatLng(latlng);
        marker.setIcon(icon);
        marker.setTooltipContent(tooltipHtml);

        // If popup is open, update its content too
        if (marker.isPopupOpen()) {
          const popupHtml = this.generateProjectPopup(site);
          marker.setPopupContent(popupHtml);
        }
      } else {
        // CREATE NEW
        marker = this.L.marker(latlng, { icon });
        this.markerMap.set(siteId, marker);

        marker.bindTooltip(tooltipHtml, {
          direction: 'top',
          offset: [0, -20],
          sticky: true,
          opacity: 0.95,
          className: 'custom-tooltip'
        });

        // marker.on('click', async () => {
        //   const project = this.projectName?.toLowerCase();
        //   if (project === 'vms') {
        //     this.markerClicked.emit(siteId);
        //     this.waitAndBindPopup(siteId, marker);
        //   } else if (project === 'itms' || project === 'ivms') {
        //     marker.bindPopup(`<div style="padding:8px;color:#999">Loading stream...</div>`).openPopup();
        //     if (!site.__streamLoaded) {
        //       site.__streamLoaded = true;
        //       site.__streamUrl = await this.prepareItmsStream(site);
        //     }
        //     marker.setPopupContent(this.generateProjectPopup(site));
        //     marker.off('popupclose').on('popupclose', () => {
        //       this.onClosePreview(site.id);
        //       site.__streamLoaded = false;
        //       site.__streamUrl = null;
        //     });
        //   } else {
        //     marker.unbindPopup();
        //     marker.bindPopup(this.generateProjectPopup(site), { autoClose: true, closeOnClick: true }).openPopup();
        //   }
        // });

        if (this.useMarkerCluster) {
          if (!this.markerCluster && (this.L as any).markerClusterGroup) {
            this.markerCluster = (this.L as any).markerClusterGroup({
              maxClusterRadius: 50,
              showCoverageOnHover: true,
              zoomToBoundsOnClick: true
            });
            this.map.addLayer(this.markerCluster);
          }
          if (this.markerCluster) {
            this.markerCluster.addLayer(marker);
          } else {
            marker.addTo(this.map);
          }
        } else {
          marker.addTo(this.map);
        }
      }
    }

    // CLEANUP STALE MARKERS
    this.markerMap.forEach((marker, id) => {
      if (!currentSiteIds.has(id)) {
        if (this.useMarkerCluster && this.markerCluster) {
          this.markerCluster.removeLayer(marker);
        } else {
          this.map.removeLayer(marker);
        }
        this.markerMap.delete(id);
      }
    });

    if (bounds.isValid() && (this.isFirstPlot || !this.boundsSet)) {
      this.map.fitBounds(bounds, { padding: this.projectName?.toLowerCase() === 'vms' ? [150, 150] : [30, 30] });
      this.boundsSet = true;
      this.isFirstPlot = false;
    }
  }
  private plotSitesForENVR(sites: any[]): void {
    if (!this.map || !this.L) return;

    const bounds = this.L.latLngBounds([]);
    const currentSiteIds = new Set<string>();
    this.sites = sites;

    for (const site of sites) {
      const lat = parseFloat(site.lat);
      const lng = parseFloat(site.lon);
      if (isNaN(lat) || isNaN(lng)) continue;

      const siteId = site.id?.toString() || site.name;
      currentSiteIds.add(siteId);

      const latlng = this.L.latLng(lat, lng);
      bounds.extend(latlng);

      const status = site.status || site.Status;
      const iconUrl = this.getIconByProject(status);
      const icon = this.L.icon({
        iconUrl: iconUrl,
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [0, -25],
        className: 'custom-map-icon'
      });

      const tooltipHtml = `
        <div style="padding: 4px; line-height: 1.4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="font-weight: bold; font-size: 13px; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.2); margin-bottom: 4px; padding-bottom: 2px;">
            ${site.name}
          </div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.85); display: flex; align-items: center;">
            <span style="margin-right: 4px;">Status:</span>
            <span style="font-weight: 600; color: #fff;">${status || 'N/A'}</span>
          </div>
        </div>
      `;

      let marker = this.markerMap.get(siteId);

      if (marker) {
        // UPDATE EXISTING
        marker.setLatLng(latlng);
        marker.setIcon(icon);
        marker.setTooltipContent(tooltipHtml);

        if (marker.isPopupOpen()) {
          marker.setPopupContent(this.generateProjectPopup(site));
        }
      } else {
        // CREATE NEW
        marker = this.L.marker(latlng, { icon });
        this.markerMap.set(siteId, marker);

        marker.bindTooltip(tooltipHtml, {
          direction: 'top',
          offset: [0, -20],
          sticky: true,
          opacity: 0.95,
          className: 'custom-tooltip'
        });

        marker.on('click', () => {
          if (this.projectName?.toLowerCase() === 'envr') {
            this.markerClicked.emit(siteId);
            this.waitAndBindPopup(siteId, marker);
          } else {
            marker.unbindPopup();
            this.markerClicked.emit(siteId);
            marker.bindPopup(this.generateProjectPopup(site), { autoClose: true, closeOnClick: true }).openPopup();
          }
        });

        if (this.useMarkerCluster) {
          if (!this.markerCluster && (this.L as any).markerClusterGroup) {
            this.markerCluster = (this.L as any).markerClusterGroup({
              maxClusterRadius: 50,
              showCoverageOnHover: true,
              zoomToBoundsOnClick: true
            });
            this.map.addLayer(this.markerCluster);
          }
          if (this.markerCluster) {
            this.markerCluster.addLayer(marker);
          } else {
            marker.addTo(this.map);
          }
        } else {
          marker.addTo(this.map);
        }
      }
    }

    // CLEANUP STALE MARKERS
    this.markerMap.forEach((marker, id) => {
      if (!currentSiteIds.has(id)) {
        if (this.useMarkerCluster && this.markerCluster) {
          this.markerCluster.removeLayer(marker);
        } else {
          this.map.removeLayer(marker);
        }
        this.markerMap.delete(id);
      }
    });

    if (bounds.isValid() && (this.isFirstPlot || !this.boundsSet)) {
      this.map.fitBounds(bounds, { padding: this.projectName?.toLowerCase() === 'vms' ? [150, 150] : [30, 30] });
      this.boundsSet = true;
      this.isFirstPlot = false;
    }
  }
  generateProjectPopup(site: any): string {
    const project = this.projectName?.toLowerCase();

    if (project === 'pa') {
      return this.generatePaSitePopup(site);
    }
    else if (project === 'vms') {
      return this.generateVMSSitePopup(site);
    }
    else if (project === 'envr') {
      return this.generateENVRSitePopup(site);
    }
    else if (project === 'itms') {
      return this.generateItmsSitePopup(site);
    }
    else if (project === 'ivms') {
      return this.generateItmsSitePopup(site);
    }
    // Default fallback popup
    return `<b>${site.name || 'Unknown Site'}</b>`;
  }

  getIconByProject(status: any): string {
    const project = this.projectName?.toLowerCase();

    if (project === 'pa') {
      // Uses your existing PA status logic
      return this.getStatusIcon(status);
    }
    else if (project === 'vms') {
      // For VMS/VMD, status is usually 1 (online) or 0 (offline)
      const statusStr = (status === 1 || status === '1' || status === 'Online') ? 'online' : 'offline';
      return this.getVmsStatusIcon(statusStr);
    }

    else if (project === 'envr') {
      // For VMS/VMD, status is usually 1 (online) or 0 (offline)
      const statusStr = (status === 1 || status === '1' || status === 'online') ? 'online' : 'offline';
      return this.getAirQualityStatusIcon(statusStr);
    }
    else if (project === 'itms') {
      // For VMS/VMD, status is usually 1 (online) or 0 (offline)
      const statusStr = (status === 1 || status === '1' || status === 'Online') ? 'online' : 'offline';
      return this.getitmsStatusIcon(statusStr);
    }
    else if (project === 'ivms') {
      // For VMS/VMD, status is usually 1 (online) or 0 (offline)
      const statusStr = (status === 1 || status === '1' || status === 'Online') ? 'online' : 'offline';
      return this.getitmsStatusIcon(statusStr);
    }

    // Fallback icon if project is unknown
    return 'assets/img/pa_blue.png';
  }



  private addDrawControl(): void {
    this.drawnItems = new this.L.FeatureGroup();
    this.map.addLayer(this.drawnItems);

    const drawControl = new this.L.Control.Draw({
      edit: { featureGroup: this.drawnItems },
      draw: { polygon: { allowIntersection: false, shapeOptions: { color: 'green' } }, polyline: false, rectangle: false, circle: false, marker: false, circlemarker: false }
    });

    this.map.addControl(drawControl);

    const drawEvent = this.L?.Draw?.Event?.CREATED;
    if (!drawEvent) return;

    this.map.on(drawEvent, (e: any) => {
      const layer = e.layer;
      this.drawnItems.addLayer(layer);
      const latlngs = layer.getLatLngs()[0];
      const coords = latlngs.map((p: any) => [p.lng, p.lat]);
      if (coords.length && (coords[0][0] !== coords.at(-1)[0] || coords[0][1] !== coords.at(-1)[1])) coords.push([...coords[0]]);
      this.polygonDrawn.emit([coords]);
    });

    this.map.on('draw:edited', (e: any) => {
      e.layers.eachLayer((layer: any) => {
        const latlngs = layer.getLatLngs()[0];
        const coords = latlngs.map((p: any) => [p.lng, p.lat]);
        if (coords.length && (coords[0][0] !== coords.at(-1)[0] || coords[0][1] !== coords.at(-1)[1])) coords.push([...coords[0]]);
        this.polygonDrawn.emit([coords]);
      });
    });
  }

  // private renderExistingPolygon(polygonStr: string) {
  //   try {
  //     const coords = JSON.parse(polygonStr);
  //     const latlngs = coords[0].map(([lng, lat]: [number, number]) => this.L.latLng(lat, lng));
  //     const polygon = this.L.polygon(latlngs, { color: 'blue' }).addTo(this.map);
  //     this.drawnItems = new this.L.FeatureGroup();
  //     this.drawnItems.addLayer(polygon);
  //     this.map.fitBounds(polygon.getBounds());
  //   } catch (e) {
  //     console.error('Invalid polygon format:', e);
  //   }
  // }

  private renderExistingPolygon(polygonStr: string) {
    // debugger;
    try {
      // 1. Parse the string into an array of polygons
      const allPolygonCoords = JSON.parse(polygonStr);

      // 2. Initialize the FeatureGroup once (before the loop)
      // This allows all polygons to be part of the same editable group
      if (!this.drawnItems) {
        this.drawnItems = new this.L.FeatureGroup();
        this.map.addLayer(this.drawnItems);
      } else {
        this.drawnItems.clearLayers();
      }

      // 3. Loop through the array of polygons
      allPolygonCoords.forEach((singlePolyCoords: any) => {
        // Check if it's nested (GeoJSON style usually has coords in the first index)
        const ring = Array.isArray(singlePolyCoords[0][0]) ? singlePolyCoords[0] : singlePolyCoords;

        const latlngs = ring.map(([lng, lat]: [number, number]) => this.L.latLng(lat, lng));

        const polygon = this.L.polygon(latlngs, { color: 'grey' });

        // Add each polygon to the map and the FeatureGroup
        polygon.addTo(this.map);
        this.drawnItems.addLayer(polygon);
      });

      // 4. Zoom the map to fit ALL drawn polygons
      if (this.drawnItems.getLayers().length > 0) {
        // this.map.fitBounds(this.drawnItems.getBounds(), { padding: this.projectName?.toLowerCase() === 'vms' ? [150, 150] : [30, 30] });
      }

    } catch (e) {
      console.error('Invalid polygon format:', e);
    }
  }






  private plotSites(): void {
    if (!this.map || !this.L) return;

    this.sites = this.siteData;
    const bounds = this.L.latLngBounds([]);
    const currentSiteIds = new Set<string>();

    for (const site of this.sites) {
      const lat = parseFloat(site.lat ?? site.latitude);
      const lng = parseFloat(site.long ?? site.lon ?? site.longitude);
      if (isNaN(lat) || isNaN(lng)) continue;

      const siteId = site.siteId ?? site.name;
      currentSiteIds.add(siteId);

      const latlng = this.L.latLng(lat, lng);
      bounds.extend(latlng);

      let iconUrl = 'assets/images/marker-red.png';
      if (site.status?.toLowerCase() === 'connected') {
        iconUrl = 'assets/img/icon_ATCS_green.svg';
      } else if (site.status?.toLowerCase() === 'disconnected') {
        iconUrl = 'assets/img/icon_ATCS_red.svg';
      } else {
        iconUrl = site.mapIconUrl ?? 'assets/img/pa_blue.png';
      }

      const icon = this.L.icon({
        iconUrl: iconUrl,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
      });

      const tooltipHtml = `
        <div style="padding: 4px; line-height: 1.4; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="font-weight: bold; font-size: 13px; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.2); margin-bottom: 4px; padding-bottom: 2px;">
            ${site.name}
          </div>
          <div style="font-size: 11px; color: rgba(255,255,255,0.85); display: flex; align-items: center;">
            <span style="margin-right: 4px;">Status:</span>
            <span style="font-weight: 600; color: #fff;">${site.status || site.Status || 'N/A'}</span>
          </div>
        </div>
      `;

      let marker = this.markerMap.get(siteId);
      debugger;
      if (marker) {
        // UPDATE EXISTING
        marker.setLatLng(latlng);
        marker.setIcon(icon);
        marker.setTooltipContent(tooltipHtml);
        debugger;
        if (marker.isPopupOpen()) {
          const data = this.popupData?.[siteId];
          const popupHtml = data ? this.generatePopupHtml(siteId, this.popupData) : this.generateProjectPopup(site);
          marker.setPopupContent(popupHtml);
        }
      } else {
        // CREATE NEW
        marker = this.L.marker(latlng, { icon });
        this.markerMap.set(siteId, marker);

        marker.bindTooltip(tooltipHtml, {
          direction: 'top',
          offset: [0, -20],
          sticky: true,
          opacity: 0.95,
          className: 'custom-tooltip'
        });

        marker.on('click', () => {
          debugger;
          this.markerClicked.emit(site.siteId ?? site.name);
          this.waitAndBindPopup(site.siteId ?? site.name, marker);
        });

        if (this.useMarkerCluster) {
          if (!this.markerCluster && (this.L as any).markerClusterGroup) {
            this.markerCluster = (this.L as any).markerClusterGroup({
              maxClusterRadius: 50,
              showCoverageOnHover: true,
              zoomToBoundsOnClick: true
            });
            this.map.addLayer(this.markerCluster);
          }
          if (this.markerCluster) {
            this.markerCluster.addLayer(marker);
          } else {
            marker.addTo(this.map);
          }
        }
        else {
          marker.addTo(this.map);
        }
      }
    }

    // CLEANUP STALE MARKERS
    this.markerMap.forEach((marker, id) => {
      if (!currentSiteIds.has(id)) {
        if (this.useMarkerCluster && this.markerCluster) {
          this.markerCluster.removeLayer(marker);
        } else {
          this.map.removeLayer(marker);
        }
        this.markerMap.delete(id);
      }
    });

    if (bounds.isValid() && (this.isFirstPlot || !this.boundsSet)) {
      this.map.fitBounds(bounds, { padding: this.projectName?.toLowerCase() === 'vms' ? [150, 150] : [30, 30] });
      this.boundsSet = true;
      this.isFirstPlot = false;
    }
  }

  private waitAndBindPopup(siteId: string, marker: any): void {
    let attempts = 0;
    const maxAttempts = 10;

    const checkAndBind = () => {
      const data = this.popupData?.[siteId];
      const popupHtml = data ? this.generatePopupHtml(siteId, this.popupData) : (attempts >= maxAttempts ? this.generatePopupHtml(siteId, null, true) : null);

      if (popupHtml) {
        marker.unbindPopup();
        marker.bindPopup(popupHtml).openPopup();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkAndBind, 200);
      }
    };

    checkAndBind();
  }

  // private generatePopupHtml(siteId: string, statusData: any, isError = false): string {
  //   const site = this.sites.find(s => s.siteId === siteId) ?? { siteName: 'Unknown' };
  //   const header = `<div class="popup-header">${site.siteName}</div>`;

  //   if (isError || !statusData || !statusData[siteId]) {
  //     return `
  //       <div class="popup-container">
  //         ${header}
  //         <div class="popup-error">
  //           <div>⚠️</div>
  //           <strong>Data Unavailable</strong>
  //           <span>Server error (500)</span>
  //         </div>
  //       </div>
  //     `;
  //   }

  //   const controller = statusData[siteId]?.controller ?? {};
  //   const rowsHtml = this.labelList.map(label => {
  //     let value: any = controller[label.key];
  //     switch (label.key) {
  //       case 'sl':
  //         value = (controller.jnAdaptiveInfo?.CoordPhaseSaturationLevel ?? 0) * 100;
  //         if (!isNaN(value)) value = value.toFixed(1) + '%';
  //         break;
  //       case 'm': value = this.getMode(controller[label.key]); break;
  //       case 'h': value = this.getHealth(controller[label.key]); break;
  //     }
  //     if (value === null || value === undefined || value === '') value = '—';
  //     return `<tr><td>${label.label}</td><td>${value}</td></tr>`;
  //   }).join('');

  //   return `
  //     <div class="popup-container">
  //       ${header}
  //       <table class="popup-table">${rowsHtml}</table>
  //     </div>
  //   `;
  // }


  private generatePopupHtml(siteId: string, statusData: any, isError: boolean = false): string {
    debugger;
    const site = this.sites.find(s => s.id?.toString() === siteId?.toString() || s.siteId?.toString() === siteId?.toString() || s.name === siteId?.toString());
    const siteName = site?.siteName ?? site?.name ?? 'Unknown Site';

    if (this.projectName?.toLowerCase() === 'vms') {
      return this.generateVMSSitePopup(statusData?.[siteId] || site);
    }

    if (this.projectName?.toLowerCase() === 'envr') {
      // For ENVR, merge socket data (site) with async API data (statusData[siteId])
      const mergedSite = {
        ...site,
        aqi: statusData?.[siteId]?.aqi || 'Loading...'
      };
      return this.generateENVRSitePopup(mergedSite);
    }

    // Header template used for both success and error states
    const headerHtml = `
    <div style="text-align: center; font-weight: bold; font-size: 14px; margin-bottom: 8px; color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 5px; text-transform: capitalize;">
      ${siteName} 
    </div>
  `;

    // 1. Check for Error State or Missing Data
    if (isError || !statusData || !statusData[siteId]) {
      return `
      <div style="font-family: Arial, sans-serif; font-size: 12px; width: 220px; padding: 5px;">
        ${headerHtml}
        <div style="background: #fff5f5; border: 1px solid #feb2b2; color: #c53030; padding: 12px; border-radius: 4px; text-align: center; margin-top: 5px;">
          <div style="font-size: 18px; margin-bottom: 4px;">⚠️</div>
          <strong style="display: block; margin-bottom: 2px;">Data Unavailable</strong>
          <span style="font-size: 10px; opacity: 0.8;">The server encountered an error for this site (500).</span>
        </div>
      </div>
    `;
    }

    // 2. Normal Data Processing
    else {
      const controllerData = statusData[siteId]?.controller ?? {};

      const rowsHtml = this.labelList.map(label => {
        let value: any;

        switch (label.key) {
          case 'sl':
            value = (controllerData.jnAdaptiveInfo?.CoordPhaseSaturationLevel ?? 0) * 100;
            if (!isNaN(value)) value = value.toFixed(1) + '%';
            break;
          case 'm':
            value = this.getMode(controllerData[label.key]);
            break;
          case 'h':
            value = this.getHealth(controllerData[label.key]);
            break;
          default:
            value = controllerData[label.key];
            break;
        }

        if (value === null || value === undefined || value === '') {
          value = '—';
        }

        return `
      <tr>
        <td style="padding: 6px 8px; font-weight: bold; color: #333; border-bottom: 1px solid #eee;">${label.label}</td>
        <td style="padding: 6px 8px; color: #555; border-bottom: 1px solid #eee;">${value}</td>
      </tr>
    `;
      }).join('');

      return `
    <div style="font-family: Arial, sans-serif; font-size: 12px; min-width: 240px; max-width: 280px;">
      ${headerHtml}
      <table style="width: 100%; border-collapse: collapse; background: #f9f9f9; border-radius: 4px; overflow: hidden; border: 1px solid #eee;">
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
  `;
    }
  }

  getMode(input: number): string {
    const modes: Record<number, string> = { 3: "Adaptive Mode", 4: "Cableless Mode", 5: "Auxiliary Mode", 6: "VA Mode", 7: "Manual Mode", 8: "Hurry Call Mode" };
    return modes[input] ?? '';
  }

  getHealth(input: number): string {
    const health: Record<number, string> = {
      2: "Boot up Success", 3: "Startup Flash", 4: "Startup Red", 5: "Plan running", 6: "Plan Stopped",
      7: "POPA Flash", 8: "POPA Lamp Off", 9: "POPA All Red", 10: "POPA Manual", 11: "POPA S1",
      12: "POPA Hurry Call", 13: "POPA Step", 14: "POPA Panel test", 15: "POPA VA", 16: "Intra Conflict",
      17: "Inter Conflict", 18: "Voltage Fail", 19: "Frequency Fails", 20: "Overload", 21: "Phase reversal",
      22: "Lamp Fail", 23: "Traffic Error", 24: "Jn Recovered", 25: "Jn Flash Mode", 30: "Siteid error",
      31: "LMS Error", 32: "RTC Error", 33: "Traffic Error", 34: "POPA S2", 35: "SENSETXFORMER"
    };
    return health[input] ?? '';
  }
  // async prepareItmsStream(site: any) {
  //   try {
  //     const globalRes: any = await firstValueFrom(
  //       this.pramglobalService.GetAllGlobalValues('Project', site.id.toString())
  //     );

  //     const embedUrl = globalRes?.result?.[0]?.rfu1;
  //     const rfu2 = globalRes?.result?.[0]?.rfu2 ?? '';

  //     if (!embedUrl) return null;

  //     const streamRes: any = await firstValueFrom(
  //       this.surveillanceService.getLiveStreamUrl(site.id, embedUrl)
  //     );

  //     return (streamRes?.data?.embedurl || '') + rfu2;
  //   } catch (e) {
  //     console.error('ITMS stream error', e);
  //     return null;
  //   }
  // }
  private generateItmsSitePopup(site: any): string {
    const statusColor = site.isReachable ? '#27ae60' : '#e74c3c';

    const iframeHtml = site.__streamUrl
      ? `
      <iframe
        src="${site.__streamUrl}"
        width="100%"
        height="220"
        frameborder="0"
        allow="autoplay; fullscreen"
        style="background:black;border-radius:6px;">
      </iframe>
    `
      : `<div style="color:#999;text-align:center;padding:8px">Stream unavailable</div>`;

    return `
    <div style="padding: 5px; min-width: 240px;">
      <h6 style="margin-bottom:6px;border-bottom:2px solid ${statusColor}">
        ${site.name || 'Camera'}
      </h6>
      ${iframeHtml}
    </div>
  `;
  }

  // onClosePreview(siteId: number): void {
  //   debugger;
  //   if (!siteId) return;

  //   this.surveillanceService
  //     .stopLiveStream(siteId)
  //     .subscribe({
  //       next: () => {
  //         console.log(` Stream stopped for site ${siteId}`);
  //       },
  //       error: err => {
  //         console.error('Error stopping stream:', err);
  //       }
  //     });
  // }

}