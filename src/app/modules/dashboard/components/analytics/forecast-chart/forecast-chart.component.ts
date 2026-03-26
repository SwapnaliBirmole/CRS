import { Component } from '@angular/core';
import { MaterialModule } from "src/app/shared/Material.module";
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
@Component({
  selector: 'app-forecast-chart',
  imports: [MaterialModule,HighchartsChartComponent],
  templateUrl: './forecast-chart.component.html',
  styleUrl: './forecast-chart.component.css',
})
export class ForecastChartComponent {
    Highcharts: typeof Highcharts = Highcharts;
  
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      height: 300
    },
  
    title: { text: '' },
  
    xAxis: {
      categories: ['00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      tickmarkPlacement: 'on',
      lineColor: '#ccc',
      labels: {
        style: {
          color: '#999',
          fontSize: '12px'
        }
      }
    },
  
    yAxis: {
      min: 0,
      max: 100,
      tickPositions: [0, 25, 50, 75, 100],
      title: { text: '' },
      gridLineColor: '#eee',
      labels: {
        style: {
          color: '#999',
          fontSize: '12px'
        }
      }
    },
  
    legend: { enabled: false },
  
    credits: { enabled: false },
  
    tooltip: {
      shared: true
    },
  
    plotOptions: {
      area: {
        marker: {
          enabled: false
        },
        lineWidth: 2,
      fillOpacity: 0.6,
        states: {
          hover: {
            lineWidth: 2
          }
        }
      },
      series: {
        animation: true,
        states: { inactive: { opacity: 1 } }
      }
    },
  
    series: [
      {
        type: 'area',
        name: 'Top Layer',
        data: [30, 35, 45, 55, 60, 58],
        color: {
    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    stops: [
      [0, 'rgba(63, 240, 128, 0.9)'],
      [1, 'rgba(34,197,94,0.1)']
    ]
  },
        fillOpacity: 0.8
      },
      {
        type: 'area',
        name: 'Middle Layer',
        data: [20, 22, 28, 35, 40, 38],
       // color: '#06b6d4',
       color: {
    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    stops: [
      [0, 'rgba(22, 223, 156, 0.9)'],
      [1, 'rgba(34,197,94,0.1)']
    ]
  },
        fillOpacity: 0.6
      },
      {
        type: 'area',
        name: 'Bottom Layer',
        data: [15, 14, 18, 22, 25, 23],
        // color: '#facc15',
        color: {
    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    stops: [
      [0, 'rgba(34, 197, 148, 0.9)'],
      [1, 'rgba(34,197,94,0.1)']
    ]
  },
        fillOpacity: 0.4
      }
    ]
  };
}
