import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { InteractionService } from 'src/app/services/interaction.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-choice-button',
  templateUrl: './choice-button.component.html',
  styleUrls: ['./choice-button.component.css']
})
export class ChoiceButtonComponent implements AfterViewInit {
 
  constructor(private _interactionService: InteractionService,
    private _chatService : ChatService ) { }

  ngAfterViewInit() {
    this._chatService.updateScroll();
  }
  
  @Input() buttonText: string;

  SendUserInput(){
    this._interactionService.sendButtonMessage(this.buttonText);
  }
}
