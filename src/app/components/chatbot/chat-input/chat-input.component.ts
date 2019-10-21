import { Component} from "@angular/core";
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: "app-chat-input",
  templateUrl: "./chat-input.component.html",
  styleUrls: ["./chat-input.component.css"]
})
export class ChatInputComponent {
  constructor(
    private _conversationService : ConversationService
  ) {}

  userInput: string = "";

  SendUserInput() {
    if (this.userInput.length !== 0) {
      this._conversationService.ProcessInput(this.userInput);
    }
    this.userInput = "";
  }
}
