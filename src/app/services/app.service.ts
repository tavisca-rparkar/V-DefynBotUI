import { Injectable } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { DialogflowApiService } from "./dialogflowApi.service";
import { LocationApiService } from './locationApi.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MockableApiService } from './mockableApi.service';
import { RestaurantApiService } from './restaurant-api.service';

@Injectable({
  providedIn: "root"
})

export class AppService {

  constructor(
    private _componentFactoryService: ComponentFactoryService,
    private _dialogflowService: DialogflowApiService,
    private _mockableService: MockableApiService,
    private _restaurantApiService: RestaurantApiService
  ) {}

  async InitiateConversation(){
    /* ************ JUST FOR DEVELOPMENT ************
    
    let data = this._restaurantApiService.GetMockRestaurantsList("Dummy(initiate-conversation)");
    console.log(data);
    this._componentFactoryService.AddRestaurantCarousel(data);

    // ************ JUST FOR DEVELOPMENT  ************/
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
        console.log(response);
      });
  }

  IntentRouter(intent:string, response){
    switch(intent){
      case "Welcome" : this.WelcomeIntentIntent(response);
      break;
      case "Book Table" : this.BookTableIntent(response);
      break;
      case "Show Details" : this.ShowDetailsIntent(response);
      break;
      case "Fallback" : this.FallbackIntent(response);
      break;
      case "Order Food" : this.OrderFoodIntent(response);
      break;
      default: this.SmallTalkIntent(response);
      break;
    }
  }

  BookTableIntent(response){
    if(response["queryResult"]["allRequiredParamsPresent"])
    {
        let city = response["queryResult"]["parameters"]["geo-city"]
        this._restaurantApiService.GetRestaurantsList(city)
        .pipe(catchError(err => {
            this._componentFactoryService.AddTextBubble("Sorry, I am unable to process this response at the momment", "bot");
            return throwError(err);
        }))
        .subscribe((data) => {
            if(data===404){
              this._componentFactoryService.AddTextBubble("Sorry, I wasn't able to find any restaurants in that area.", "bot");
            }else{
              // show results here - 
              this._componentFactoryService.AddTextBubble("Showing you Restaurants in "+city+"-", "bot");
              this._componentFactoryService.AddRestaurantCarousel(data);
            }
        });    
    }else{
      this._componentFactoryService.AddTextBubble(response["queryResult"]["fulfillmentText"], "bot");
    }
  }

  ShowDetailsIntent(response){
      this._componentFactoryService.AddTextBubble("Showing you details...","bot");
      console.log(response);
      console.log(response[0] + "  " + response[1]  );
  }
  

  OrderFoodIntent(response) {
    if(response["queryResult"]["allRequiredParamsPresent"])
    {
        let city = response["queryResult"]["parameters"]["geo-city"]
        this._componentFactoryService.AddTextBubble(response["queryResult"]["fulfillmentText"], "bot");
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

  FallbackIntent(response) {
    this._componentFactoryService.AddTextBubble(
      response["queryResult"]["fulfillmentText"],
      "bot"
    );
  }
}
