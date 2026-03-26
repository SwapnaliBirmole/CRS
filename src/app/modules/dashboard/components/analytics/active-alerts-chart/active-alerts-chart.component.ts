import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartComponent } from 'highcharts-angular';
@Component({
  selector: 'app-active-alerts-chart',
  imports: [HighchartsChartComponent],
  templateUrl: './active-alerts-chart.component.html',
  styleUrl: './active-alerts-chart.component.css',
})
export class ActiveAlertsChartComponent {
  Highcharts: typeof Highcharts = Highcharts;

chartOptions: Highcharts.Options = {
  chart: {
    type: 'column',
    backgroundColor: 'transparent',
    height: 300
  },

  title: { text: '' },

  xAxis: {
    categories: ['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar'],
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
            name: 'District',
            data: [10, 3, 5, 12, 9, 7]
        }
  ]
};
}
