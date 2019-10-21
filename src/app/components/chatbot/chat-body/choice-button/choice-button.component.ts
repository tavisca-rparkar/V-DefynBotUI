import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-choice-button',
  templateUrl: './choice-button.component.html',
  styleUrls: ['./choice-button.component.css']
})
export class ChoiceButtonComponent implements AfterViewInit {
 
  constructor(private _conversationService: ConversationService,
    private _chatService : ChatService ) { }

  ngAfterViewInit() {
    this._chatService.updateScroll();
  }
  
  @Input() buttonText: string;

  SendUserInput(){
    this._conversationService.ProcessInput(this.buttonText);
  }
}
