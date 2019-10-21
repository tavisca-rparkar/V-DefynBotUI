import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ConversationService } from "src/app/services/conversation.service";
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: "app-chat-input",
  templateUrl: "./chat-input.component.html",
  styleUrls: ["./chat-input.component.css"]
})
export class ChatInputComponent implements OnInit {
  ngOnInit(){
    this._InteractionService.buttonInteraction$
    .subscribe(
      message => {
          this.SendButtonInput(message);
      }
    );
    this._InteractionService.chatBodyInteraction$
    .subscribe(
      message => {
          this.InitiateConversation();
      }
    );

  }
  constructor(
    private _conversationService: ConversationService,
    private _InteractionService : InteractionService
  ) {}

  userInput: string = "";

  SendUserInput() {
    if (this.userInput.length !== 0) {
      //this.chat.textUpdate(this.userInput, "bot");
      this._conversationService.ProcessInput(this.userInput);
      // user input text type is - "user"
    }
    this.userInput = "";
  }

  SendButtonInput(message:string) {
    this._conversationService.ProcessInput(message);
  }

  InitiateConversation() {
    this._conversationService.InitiateConversation();
  }
}
