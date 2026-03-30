import { Component } from '@angular/core';
import { ChatPageHeaderComponent } from "../../components/chat-ai-component/chat-page-header/chat-page-header.component";
import { ChatPageSidebarComponent } from "../../components/chat-ai-component/chat-page-sidebar/chat-page-sidebar.component";
import { ChatWindowComponent } from "../../components/chat-ai-component/chat-window/chat-window.component";

@Component({
  selector: 'app-chat-page',
  imports: [ChatPageHeaderComponent, ChatPageSidebarComponent, ChatWindowComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent {

}
