import { Component } from '@angular/core';
import { MaterialModule } from "src/app/shared/Material.module";

@Component({
  selector: 'app-forecast-chart',
  imports: [MaterialModule],
  templateUrl: './forecast-chart.component.html',
  styleUrl: './forecast-chart.component.css',
})
export class ForecastChartComponent {}
