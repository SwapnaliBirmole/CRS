import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from "angular-svg-icon";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-chat-window',
  imports: [CommonModule, FormsModule, AngularSvgIconModule, MatIcon],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.css',
})
export class ChatWindowComponent {
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
