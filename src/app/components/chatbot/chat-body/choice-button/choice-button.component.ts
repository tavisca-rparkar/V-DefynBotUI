import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-choice-button',
  templateUrl: './choice-button.component.html',
  styleUrls: ['./choice-button.component.css']
})
export class ChoiceButtonComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.chatService.updateScroll();
  }

  constructor(private chatService: ChatService, private conversationService: ConversationService ) { }

  ngOnInit() {
  }
  
  @Input() buttonText: string;

  SendUserInput(){
    this.conversationService.ProcessInput(this.buttonText);
  }
}
