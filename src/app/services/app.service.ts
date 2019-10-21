import { Injectable } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { DialogflowApiService } from "./dialogflowApi.service";
import { LocationApiService } from './locationApi.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MockableApiService } from './mockableApi.service';

@Injectable({
  providedIn: "root"
})

export class AppService {

  constructor(
    private _componentFactoryService: ComponentFactoryService,
    private _dialogflowService: DialogflowApiService,
    private _locationService: LocationApiService,
    private _mockableService: MockableApiService
  ) {}

  async InitiateConversation(){
    await this._mockableService.GetResponse();
    this.IntentProcessing("Hello");
  }

  ProcessInput(userInput: string) {
    // print on screen
    this._componentFactoryService.AddTextBubble(userInput, "user");
    // send to dialogflow and call necessary functions
    this.IntentProcessing(userInput);
  }

  IntentProcessing(userInput:string){
      this._dialogflowService.GetResponse(userInput)
      .pipe(catchError(err => {
        this._componentFactoryService.AddTextBubble("Sorry, I am unable to talk at the momment. Please contact the Site Administrator to report this issue.", "bot");
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
        this._locationService.GetResponse(city)
        .pipe(catchError(err => {
            this._componentFactoryService.AddTextBubble("Sorry, I was unable to contact the vendor, can you please try again after some time.", "bot");
            return throwError(err);
        }))
        .subscribe((data) => { // code for location check -(only used in sprint-1)
              if(data[0] === "true")
              {
                this._componentFactoryService.AddTextBubble("Showing you Restaurants in "+city+".", "bot");
                // show results here - 
              }else{
                this._componentFactoryService.AddTextBubble("Please tell me where do you want me look for restaurants!", "bot");
              }
        });    
    }else{
      this._componentFactoryService.AddTextBubble(response["queryResult"]["fulfillmentText"], "bot");
    }
  }

  WelcomeIntentIntent(response) {
    this._componentFactoryService.AddTextBubble(response["queryResult"]["fulfillmentText"], "bot");
    this._componentFactoryService.AddChoiceButton(["Book a Table","Order Food"]);
  }

  SmallTalkIntent(response){
    this._componentFactoryService.AddTextBubble(response["queryResult"]["fulfillmentText"], "bot");
  }

  FallbackIntent() {
    this._componentFactoryService.AddTextBubble(
      "Sorry, I didn't catch that! I can help you book tables at restaurants nearby and order food from nearby outlets.",
      "bot"
    );
  }
}
