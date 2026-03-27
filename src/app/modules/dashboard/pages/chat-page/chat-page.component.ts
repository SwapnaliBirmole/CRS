import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatPageHeaderComponent } from "../../components/chat-ai-component/chat-page-header/chat-page-header.component";

@Component({
  selector: 'app-chat-page',
  imports: [CommonModule, FormsModule, ChatPageHeaderComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.css',
})
export class ChatPageComponent {
   userInput: string = '';

  sendMessage() {
    if (this.userInput.trim()) {
      console.log('Sending message:', this.userInput);
      // Logic to handle user message and get AI response
      this.userInput = '';
    }
  }

  onSuggestionClick(type: string) {
    console.log('Suggestion clicked:', type);
    // You could pre-fill the input or send a message automatically
  }
}
