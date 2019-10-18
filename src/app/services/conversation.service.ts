import { Injectable } from "@angular/core";
import { ChatService } from "src/app/services/chat.service";
import { DialogflowService } from "./dialogflow.service";
import { HttpErrorResponse } from '@angular/common/http';
import { LocationService } from './location.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ConversationService {
  response: JSON;

  constructor(
    private chatService: ChatService,
    private dialogflowService: DialogflowService,
    private locationService: LocationService
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
      this.dialogflowService.GetResponse(userInput)
      .pipe(catchError(err => {
        this.chatService.AddTextBubble("Sorry, I am unable to talk at the momment. Please contact the Site Administrator to report this issue.", "bot");
        return throwError(err);
    }))
      .subscribe(response => {

        this.IntentRouter(response["queryResult"]["intent"]["displayName"],response);
        
        // logging all responses from dialogflow for developers
        console.log("Query Text : ");
        console.log(response["queryResult"]["queryText"]);
        console.log("Result Parameters : ");
        console.log(response["queryResult"]["parameters"]);
        console.log("AllRequiredParametersPresent : ");
        console.log(response["queryResult"]["allRequiredParamsPresent"]);
        console.log("Response Text : ");
        console.log(response["queryResult"]["fulfillmentText"]);
        console.log("Intent : ");
        console.log(response["queryResult"]["intent"]["displayName"]);
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
    if(response["queryResult"]["allRequiredParamsPresent"])
    {
      
        let city = response["queryResult"]["parameters"]["geo-city"]
        this.locationService.GetResponse(city)
        .pipe(catchError(err => {
            this.chatService.AddTextBubble("Sorry, I was unable to contact the vendor, can you please try again after some time.", "bot");
            return throwError(err);
        }))
        .subscribe((data) => {
              if(data[0] === "true")
              {
                this.chatService.AddTextBubble("Showing you Restaurants in "+city+".", "bot");
                // show results here - 
              }else{
                this.chatService.AddTextBubble("Sorry, I don't serve in your city!", "bot");
              }
        });    
      
      
      
    }else{
      this.chatService.AddTextBubble(response["queryResult"]["fulfillmentText"], "bot");
    }
  }

  WelcomeIntentIntent(response) {
    this.chatService.AddTextBubble(response["queryResult"]["fulfillmentText"], "bot");
    this.chatService.AddChoiceButton(["Book a Table","Order Food"]);
  }

  SmallTalkIntent(response){
    this.chatService.AddTextBubble(response["queryResult"]["fulfillmentText"], "bot");
  }

  FallbackIntent() {
    this.chatService.AddTextBubble(
      "Sorry, I didn't catch that! Can you be more specific",
      "bot"
    );
  }
}
