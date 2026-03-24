import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Weather } from '../../../models/weather';

@Component({
  selector: '[weather-single-card]',
  templateUrl: './weather-single-card.component.html',
  imports: [NgStyle, CurrencyPipe],
})
export class WeatherSingleCardComponent implements OnInit {
  @Input() weather: Weather = <Weather>{};

  constructor() {}

  ngOnInit(): void {}
}
