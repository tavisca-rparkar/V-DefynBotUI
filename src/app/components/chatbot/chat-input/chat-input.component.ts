import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { ConversationService } from "src/app/services/conversation.service";
import { ChatBodyComponent } from "../chat-body/chat-body.component";

@Component({
  selector: "app-chat-input",
  templateUrl: "./chat-input.component.html",
  styleUrls: ["./chat-input.component.css"]
})
export class ChatInputComponent {
  constructor(
    private chat: ChatService,
    private conversation: ConversationService
  ) {}

  userInput: string = "";

  SendUserInput() {
    if (this.userInput.length !== 0) {
      //this.chat.textUpdate(this.userInput, "bot");
      this.conversation.ProcessInput(this.userInput);
      // user input text type is - "user"
    }
    this.userInput = "";
  }
}
