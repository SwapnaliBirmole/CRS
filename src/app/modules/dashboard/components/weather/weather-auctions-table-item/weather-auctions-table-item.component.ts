import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Weather } from '../../../models/weather';

@Component({
  selector: '[weather-auctions-table-item]',
  templateUrl: './weather-auctions-table-item.component.html',
  imports: [AngularSvgIconModule, CurrencyPipe],
})
export class WeatherAuctionsTableItemComponent implements OnInit {
  @Input() auction = <Weather>{};

  constructor() {}

  ngOnInit(): void {}
}
