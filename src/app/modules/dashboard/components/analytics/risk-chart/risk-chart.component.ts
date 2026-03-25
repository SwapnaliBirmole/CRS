import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/shared/Material.module';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-risk-chart',
  imports: [HighchartsChartModule, CommonModule,MaterialModule],
  templateUrl: './risk-chart.component.html',
  styleUrl: './risk-chart.component.css',
})
export class RiskChartComponent implements OnInit, OnDestroy {
      @Input() zoneIds: number[] = [];
      @Input() onlineCount: number = 0;
      @Input() offlineCount: number = 0;
      @Input() currentFilter: string = 'all';
      @Output() statusClicked = new EventEmitter<string>();
  @ViewChild('customLegend')
 
  customLegend!: ElementRef;
  constructor(private renderer: Renderer2, private el: ElementRef ) {}
  public element: any;
  legendData: any[] = [];
    totalPages: number = 1;
  pager: number = 0;
  MaxResultCount = 10;
  SkipCount = 0;
  perPage = 10;
  pageNo = 0;
  recordPerPage: number = 10;
  jsonData = {
    "data": [
        { "name": "Active", "y": 66, "color": "#05da4cff"},
        { "name": "Inactive", "y": 76, "color": "#98DDFF"},
    ]
};
Highcharts: typeof Highcharts = Highcharts;
chartOptions?: Highcharts.Options;

 

  ngOnInit(): void {
    this.initializeChart(this.onlineCount || 0, this.offlineCount || 0);
  } 
   ngOnChanges(changes: SimpleChanges): void {
     if (changes['onlineCount'] || changes['offlineCount']) {
       this.initializeChart(this.onlineCount || 0, this.offlineCount || 0);
     }
  }

  initializeChart(active: number, inactive: number) {
    const self = this;
    this.legendData = [
      { name: 'Active', y: active, color: '#13be03fa' },
      { name: 'Inactive', y: inactive, color: '#f70101' },
      { name: 'Total', y: active + inactive, color: '#0056b3' }
    ];
    this.chartOptions = {
      chart: {
        type: 'pie',
         margin: [0, 0, 0, 0],
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0,
        marginLeft:0,
        marginBottom:0,
        backgroundColor: 'transparent',
        events: {
          render: function () {
            const chart = this as Highcharts.Chart & { customLabel?: Highcharts.SVGElement };
            const total = chart.series[0].data.reduce(
              (sum, point) => sum + (point.y ?? 0),
              0
            );
            const text = `Total Devices<br><b>${total}</b>`;

            if (chart.customLabel) chart.customLabel.destroy();

            chart.customLabel = chart.renderer
              .text(
                text,
                chart.plotWidth / 2 + chart.plotLeft,
                chart.plotHeight / 2 + chart.plotTop
              )
              .css({
                color: '#333',
                textAlign: 'center',
                fontSize: '16px',
                cursor: 'pointer' // Make it look clickable
              })
              .attr({ align: 'center', zIndex: 5 })
               .on('click', () => {
                 self.statusClicked.emit('All'); // Emit 'All' when clicked
              })
              .on('mouseover', () => {
                chart.customLabel?.css({ color: '#0056b3', fontWeight: 'bold' });
              })
              .on('mouseout', () => {
                chart.customLabel?.css({ color: '#333', fontWeight: 'normal' });
              })
              .add();

            chart.customLabel.attr({
              x: chart.plotLeft + chart.plotWidth / 2,
              y: chart.plotTop + chart.plotHeight / 2
            });
          }
        }
      },
      title: { text: '', align: 'left' },
      tooltip: {
        useHTML: true,
        backgroundColor: 'transparent',
        borderColor: '#9ab',
        formatter: function () {
          return `<div style="
              background-color: white;
              color: #000;
              padding: 8px 12px;
              border-radius: 4px;
              border:1px solid #ccc;
              box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
              text-align:center
            ">
            ${this.name}<br/>
            <strong style="font-size:14px">${this.y}</strong>
          </div>`;
        }
      },
      legend: { enabled: false },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            connectorShape: 'none',
            distance: -10,
            allowOverlap: true,
            crop: false,
            overflow: 'allow',
            useHTML: true,
            formatter: function () {
              return `
                <div style="text-align: center; background-color:#ECEAF8;
                  border-radius:50%;width:32px; height:32px;line-height:32px">
                  <span style="font-size: 10px;">${this.y}</span>
                </div>`;
            },
            style: { fontSize: '0.9em', color: 'black' }
          } as any],
          showInLegend: true,
          events: {
            click: (event) => {
              if (event.point && event.point.name) {
                this.statusClicked.emit(event.point.name);
              }
            }
          }
        }
      },
      credits: { enabled: false },
      series: [{
        size:'100%',
        innerSize: '70%',
        borderRadius: 0,
        data: [
          { name: 'Active', y: active, color: '#13be03fa' },
          { name: 'Inactive', y: inactive, color: '#f70101' }
        ]
      }] as Highcharts.SeriesOptionsType[]
    };}


  ngOnDestroy(): void {}

}
