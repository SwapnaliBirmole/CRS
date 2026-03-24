import { Component, OnInit } from '@angular/core';
import { WeatherAuctionsTableComponent } from '../../components/weather/weather-auctions-table/weather-auctions-table.component';
import { WeatherHeaderComponent } from '../../components/weather/weather-header/weather-header.component';
import { Weather } from '../../models/weather';
import { WeatherTabbComponent } from '../../components/weather/weather-tabb/weather-tabb.component';
import { MapCardComponent } from "../../components/weather/map-card/map-card.component";

@Component({
  selector: 'app-weather',
  styleUrl:'./weather.component.css',
  templateUrl: './weather.component.html',
  imports: [
    WeatherHeaderComponent,
    WeatherTabbComponent,
    WeatherAuctionsTableComponent,
    MapCardComponent
],
})
export class WeatherComponent implements OnInit {
  weather: Array<Weather>;

  constructor() {
    this.weather = [
      {
        id: 34356771,
        title: 'Girls of the Cartoon Universe',
        creator: 'Jhon Doe',
        instant_price: 4.2,
        price: 187.47,
        ending_in: '06h 52m 47s',
        last_bid: 0.12,
        image: './assets/images/img-01.jpg',
        avatar: './assets/avatars/avt-01.jpg',
      },
      {
        id: 34356772,
        title: 'Pupaks',
        price: 548.79,
        last_bid: 0.35,
        image: './assets/images/img-02.jpg',
      },
      {
        id: 34356773,
        title: 'Seeing Green collection',
        price: 234.88,
        last_bid: 0.15,
        image: './assets/images/img-03.jpg',
      },
    ];
  }

  ngOnInit(): void {}
}
