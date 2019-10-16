import { Injectable } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { DialogflowService } from "./dialogflow.service";
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class ConversationService {
  response: JSON;

  constructor(
    private chatService: ChatService,
    private dialogflowService: DialogflowService
  ) {}

  InitiateConversation(){
    this.IntentProcessing("Hello");
  }

  ProcessInput(userInput: string) {
    // print on screen
    this.chatService.AddTextBubble(userInput, "user");
    // send to dialogflow and call necessary functions
    this.IntentProcessing(userInput);
  }

  IntentProcessing(userInput:string){
      this.dialogflowService.GetResponse(userInput).subscribe(response => {

        this.IntentRouter(response.queryResult.intent.displayName,response);
        
        // logging all responses from dialogflow for developers
        console.log("Query Text : ");
        console.log(response.queryResult.queryText);
        console.log("Result Parameters : ");
        console.log(response.queryResult.parameters);
        console.log("AllRequiredParametersPresent : ");
        console.log(response.queryResult.allRequiredParamsPresent);
        console.log("Response Text : ");
        console.log(response.queryResult.fulfillmentText);
        console.log("Intent : ");
        console.log(response.queryResult.intent.displayName);
        console.log("_________________________________________________________");
      });
    
  }

  IntentRouter(intent:string, response:JSON){
    switch(intent){
      case "Welcome" : this.WelcomeIntentIntent(response);
      break;
      case "Book Table" : this.BookTableIntent(response);
      break;
      case "Fallback" : this.FallbackIntent();
      break;
      default: this.SmallTalkIntent(response);
      break;
    }
  }

  BookTableIntent(response){
    this.chatService.AddTextBubble(response.queryResult.fulfillmentText, "bot");
  }

  WelcomeIntentIntent(response) {
    this.chatService.AddTextBubble(response.queryResult.fulfillmentText, "bot");
    this.chatService.AddChoiceButton("Book a Table");
    this.chatService.AddChoiceButton("Order Food");
  }

  SmallTalkIntent(response){
    this.chatService.AddTextBubble(response.queryResult.fulfillmentText, "bot");
  }

  FallbackIntent() {
    this.chatService.AddTextBubble(
      "Sorry, I didn't catch that! Can you be more specific",
      "bot"
    );
  }
}
