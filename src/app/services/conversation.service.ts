import { Injectable } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { DialogflowService } from "./dialogflow.service";

@Injectable({
  providedIn: "root"
})
export class ConversationService {
  response: JSON;

  constructor(
    private chatService: ChatService,
    private dialogflowService: DialogflowService
  ) {}

  ProcessInput(userInput: string) {
    // print on screen
    this.chatService.AddTextBubble(userInput, "user");
    // send to dialogflow
    this.dialogflowService.GetResponseNew(userInput).subscribe(response => {
      console.log(response);
      console.log(response.queryResult.queryText);
      console.log(response.queryResult.parameters);
      console.log(response.queryResult.allRequiredParamsPresent);
      console.log(response.queryResult.fulfillmentText);
      console.log(response.queryResult.intent.displayName);

      this.TalkToUser(response.queryResult.fulfillmentText);
    });
  }

  TalkToUser(response: string) {
    this.chatService.AddTextBubble(response, "bot");
  }

  Fallback() {
    this.chatService.AddTextBubble(
      "Sorry, I didn't catch you! Can you be more specific",
      "bot"
    );
  }
}
