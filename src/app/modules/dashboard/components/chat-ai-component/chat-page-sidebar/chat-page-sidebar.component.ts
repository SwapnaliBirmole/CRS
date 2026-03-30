import { Component } from '@angular/core';
import { AngularSvgIconModule } from "angular-svg-icon";
import { MaterialModule } from "src/app/shared/Material.module";

@Component({
  selector: 'app-chat-page-sidebar',
  imports: [AngularSvgIconModule, MaterialModule],
  templateUrl: './chat-page-sidebar.component.html',
  styleUrl: './chat-page-sidebar.component.css',
})
export class ChatPageSidebarComponent {}
