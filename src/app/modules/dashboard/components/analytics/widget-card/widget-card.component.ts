import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from "angular-svg-icon";
import { MaterialModule } from "src/app/shared/Material.module";

// Small interface for the footer items
export interface StatFooterItem {
  label: string;
  value: number | string;
}

@Component({
  selector: 'app-widget-card',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, MaterialModule],
  templateUrl: './widget-card.component.html',
  styleUrl: './widget-card.component.scss',
})
export class WidgetCardComponent {
  // Card Header & Content
  @Input() title: string = 'Active Alerts';
  @Input() mainValue: string | number = 0;
  @Input() cardColor: string  = '0';
  
  // Icon and Branding
  @Input() iconClass: string = 'fa-solid fa-triangle-exclamation';
  @Input() iconColor: string = '#f00'; 
  @Input() iconShadow: string = '#f00'; 
  
  // Trend
  @Input() trendValue?: string; 
  @Input() trendIcon: string = 'fa-solid fa-arrow-trend-up';
  @Input() trendColor: string = '#f00'; 
  // Progress Bar
  @Input() progressPercent: number = 0; 


  // Footer Details - Now correctly typed as the footer array
  @Input() footerItems: StatFooterItem[] = [];
}