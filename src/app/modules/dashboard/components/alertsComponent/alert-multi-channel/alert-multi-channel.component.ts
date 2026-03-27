import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { AngularSvgIconModule } from "angular-svg-icon";

@Component({
  selector: 'app-alert-multi-channel',
  imports: [MatIcon, CommonModule, AngularSvgIconModule],
  templateUrl: './alert-multi-channel.component.html',
  styleUrl: './alert-multi-channel.component.css',
})
export class AlertMultiChannelComponent {



 channels = [
  {
    name: 'WhatsApp',
    iconBg:'#DCFCE7',
    status: 'Active',
    sent: 2847,
    delivered: 2834,
    successRate: '100.0%',
    statusColor: 'green',
    src:'assets/icons/greenWhatsApp.svg'
  },
  {
    name: 'SMS',
    iconBg:'#DBEAFE',
    status: 'Active',
    sent: 1200,
    delivered: 1100,
    successRate: '91.6%',
    statusColor: 'green',
     src:'assets/icons/blueSMS.svg'
  },
  {
    name: 'IVR Calls',
    iconBg:'#F3E8FF',
    status: 'Active',
    sent: 5000,
    delivered: 4900,
    successRate: '98%',
    statusColor: 'green',
     src:'assets/icons/IVRCall.svg'
  },
  {
    name: 'Email',
    iconBg:'#FFEDD4',
    status: 'Pending',
    sent: 800,
    delivered: 600,
    successRate: '75%',
    statusColor: 'yellow',
    src:'assets/icons/redEmail.svg'
  }
];
}
