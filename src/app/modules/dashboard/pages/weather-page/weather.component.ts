import { Component, OnInit } from '@angular/core';
import { WeatherHeaderComponent } from '../../components/weather/weather-header/weather-header.component';

import { WeatherTabbComponent } from '../../components/weather/weather-tabb/weather-tabb.component';
import { MapCardComponent } from "../../components/weather/map-card/map-card.component";
import { CmTableComponent } from 'src/app/shared/components/cm-table/cm-table.component';
import { CmDialogComponent } from 'src/app/shared/components/cm-dialog/cm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Weather } from '../../models/weather';

@Component({
  selector: 'app-weather',
  styleUrl:'./weather.component.css',
  templateUrl: './weather.component.html',
  imports: [
    WeatherHeaderComponent,
    WeatherTabbComponent,
    // WeatherAuctionsTableComponent,
    MapCardComponent,
    CmTableComponent
],
})
export class WeatherComponent implements OnInit {
  weather: Array<Weather>;

  items: any;
  paHeadArr: any;
  paOngoingHeadArr: any;
  paUpcomingHeadArr: any;
  collectionSize: any;
  currentStatusFilter: 'all' | 'online' | 'offline' = 'all';
  recordPerPage: number = 10;
  processedItems: any[] = [];
  totalRecords: any = 0;
   headerArr: any;
  totalPages: number = 1;
  pager: number = 0;
  MaxResultCount = 10;
  SkipCount = 0;
  zoneCordinate2: any;
  polygonCoordinates: any;
  perPage = 10;
  pageNo = 0;

  constructor(private dialog: MatDialog,) {
    this.weather = [
      {
        id: 1,
        location: 'Ward 1 - Maninagar',
        rainfall: '45mm',
        risk: 'High',
        leadtime: '36 hours',
        icon: './assets/icons/locationPin.svg',
        icon2: './assets/icons/calendar.svg',
        details: [{ label: 'View Details', type: 'view', text: 'warn', disabled: false }]
      },
      {
        id: 1,
        location: 'Ward 2 - Maninagar',
        rainfall: '38mm',
        risk: 'Medium',
        leadtime: '36 hours',
        icon: './assets/icons/locationPin.svg',
        icon2: './assets/icons/calendar.svg',
         details: [{ label: 'View Details', type: 'view', color: 'warn', disabled: false }]
      },
      {
        id: 1,
        location: 'Ward 3 - Maninagar',
        rainfall: '52mm',
        risk: 'Critical',
        leadtime: '36 hours',
        icon: './assets/icons/locationPin.svg',
        icon2: './assets/icons/calendar.svg',
         details: [{ label: 'View Details', type: 'view', color: 'warn', disabled: false }]
      },
     {
        id: 1,
        location: 'Ward 4 - Maninagar',
        rainfall: '45mm',
        risk: 'Low',
        leadtime: '36 hours',
        icon: './assets/icons/locationPin.svg',
        icon2: './assets/icons/calendar.svg',
         details: [{ label: 'View Details', type: 'view', color: 'warn', disabled: false }]
      },
     {
        id: 1,
        location: 'Ward 5 - Maninagar',
        rainfall: '41mm',
        risk: 'Medium',
        leadtime: '36 hours',
        icon: './assets/icons/locationPin.svg',
        icon2: './assets/icons/calendar.svg',
         details: [{ label: 'Cancel', type: 'view', color: 'warn', disabled: false }]
      },
    ];
  }
 viewDevice(rowData: any): void {
    const dialogRef = this.dialog.open(CmDialogComponent, {
      width: '600px',
      position: { top: '80px' },
      panelClass: 'custom-dialog',
      data: {
        title: `${rowData.location}`,
        src: `${rowData.img}`,

        // type: 'info',

      }
    });


  }

    onButtonClicked({ event, data }: { event: any; data: any }) {
    if (event.type === 'view') {
      this.viewDevice(data);
    } 
  }

   buildHeader() {
    this.paHeadArr = [
      { header: 'Ward', fieldValue: 'location', position: 1, },
      { header: '24h Rainfall', fieldValue: 'rainfall', position: 2, },
      { header: 'Flood Risk', fieldValue: 'risk', position: 3, },
      { header: 'Lead Time', fieldValue: 'leadtime', position: 4, },
      { header: 'Actions', fieldValue: 'details', position: 5, },

    ];
   
  }
  ngOnInit(): void {
    this.buildHeader();
  }
}
