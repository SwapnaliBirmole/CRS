import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Weather } from '../../../models/weather';

@Component({
  selector: '[weather-dual-card]',
  templateUrl: './weather-dual-card.component.html',
  imports: [NgStyle, CurrencyPipe],
})
export class WeatherDualCardComponent implements OnInit {
  @Input() weather: Weather = <Weather>{};

  constructor() {}

  ngOnInit(): void {}
}
