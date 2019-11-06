import { Injectable } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { DialogflowApiService } from "./dialogflowApi.service";
import { catchError, delay } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MockableApiService } from './mockableApi.service';
import { RestaurantApiService } from './restaurant-api.service';
import { LocationAccessService } from './locationAccess.service';
import { StateService } from './state.service';
import { promise } from 'protractor';
import { timeout, resolve } from 'q';
import { FoodOrderingService } from './food-ordering.service';


@Injectable({
  providedIn: "root"
})

export class AppService {

  constructor(
    private _componentFactoryService: ComponentFactoryService,
    private _dialogflowService: DialogflowApiService,
    private _mockableService: MockableApiService,
    private _restaurantApiService: RestaurantApiService,
    private _locationAccess:LocationAccessService,
    private _stateService:StateService,
    private _foodOrderingService : FoodOrderingService
  ) {}

   async InitiateConversation(){
    await this._mockableService.GetResponse();
    this._locationAccess.getLocation().then(()=>{
        if(this._stateService.IslatLongProvided()){
        this.IntentProcessing("Hello");
      }
    });  
    navigator.permissions.query({name:'geolocation'}).then((result) => {
      if (result.state == 'granted') {
      } else if (result.state == 'prompt') {  
        this._componentFactoryService.AddTextBubble("Please grant us your Browser location access.","bot");
        this._componentFactoryService.addLocationButton();
      } else {
        this._componentFactoryService.AddTextBubble("Please grant us your Browser location access and click on reload.","bot");
        this._componentFactoryService.addLocationButton();
      }
     });  

}

  ProcessInput(userInput: string) {
    // print on screen
    this._componentFactoryService.AddTextBubble(userInput, "user");
    // send to dialogflow and call necessary functions
    if(this._stateService.IslatLongProvided()){
      this.IntentProcessing(userInput);
    }else{
      this._componentFactoryService.AddTextBubble("Please grant us your Browser location access.","bot");
      this._componentFactoryService.addLocationButton();
    }
    
  }

  IntentProcessing(userInput:string){
      this._dialogflowService.GetResponse(userInput)
      .pipe(catchError(err => {
        this._componentFactoryService.AddTextBubble("Sorry, I am unable to talk at the moment. Please contact the Site Administrator to report this issue.", "bot");
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

  IntentRouter(intent:string, response){
    switch(intent){
      case "Welcome" : this.WelcomeIntentIntent(response);
      break;
      case "Book Table" : this.BookTableIntent(response);
      break;
      case "Show Details" : this.ShowDetailsIntent(response);
      break;
      case "Show Carousel Again" : this.ShowCarouselAgainIntent(response);
      break;
      case "Proceed Table Booking" : this.ProceedTableBookingIntent(response);
      break;
      case "Process Booking Payment" : this.ProcessBookingPaymentIntent(response);
      break;
      case "Cancel Booking" : this.CancelBookingIntent(response);
      break;
      case "Fallback" : this.FallbackIntent(response);
      break;
      case "Order Food" : this.OrderFoodIntent(response);
      break;
      case "Show Menu" : this.ShowFoodOrderMenu(response);
      break;
      case "Get Point Balance" : this.GetPointBalanceIntent(response);
      break;
      default: this.SmallTalkIntent(response);
      break;
    }
  }

  BookTableIntent(response){
    
    if(response["queryResult"]["allRequiredParamsPresent"])
    {
        this._componentFactoryService.StartLoader();
        let city = response["queryResult"]["parameters"]["address"];
        let guestCount =  response["queryResult"]["parameters"]["number"];
        let date =  response["queryResult"]["parameters"]["date"];
        let time =  response["queryResult"]["parameters"]["time"];

        this._stateService.setBookTableData(city,guestCount,date,time);

        this._restaurantApiService.GetRestaurantsList(city,this._stateService.getLatitude(),this._stateService.getLongitude())
        .pipe(catchError(err => {
            this._componentFactoryService.AddTextBubble("Sorry, I am unable to process this response at the moment", "bot");
            this._componentFactoryService.StopLoader();
            return throwError(err);
        }))
        .subscribe((data) => {
            if(data===404){
              this._componentFactoryService.AddTextBubble("Sorry, I wasn't able to find any restaurants in that area.", "bot");
              this._componentFactoryService.StopLoader();
            }else{
              // show results here - 
              this._restaurantApiService.SetCarouselData(data);
              this._componentFactoryService.StopLoader();
              this._componentFactoryService.AddRestaurantCarousel({
                "data":data,
                "carouselType":"Restaurant Booking"
              });
            }
        });    
    }else{
      this._componentFactoryService.AddTextBubble(response["queryResult"]["fulfillmentText"], "bot");
    }
  }

  ShowDetailsIntent(response){
    this._componentFactoryService.StartLoader();
      this._restaurantApiService.GetRestaurantDetails(response[0],response[1])
        .pipe(catchError(err => {
          this._componentFactoryService.StopLoader();
            this._componentFactoryService.AddTextBubble("Sorry, I am unable to fetch the selected restaurant details", "bot");
            return throwError(err);            
        }))
        .subscribe((data) => {
            if(data===404){
              this._componentFactoryService.StopLoader();
              this._componentFactoryService.AddTextBubble("Sorry, I am unable to fetch the selected restaurant details", "bot");
            }else{
              this._componentFactoryService.StopLoader();
              // show results here - 
              this._componentFactoryService.AddRestaurantDetailsCard(data);
            }
        }); 
  }

  ShowCarouselAgainIntent(carouselType:string){
    this._componentFactoryService.StartLoader();
    let data:any;
    if(carouselType=="Restaurant Booking"){
      data = this._restaurantApiService.GetCarouselData();
    }else if(carouselType=="Food Ordering"){
      data = this._foodOrderingService.GetCarouselData();
    }
    this._componentFactoryService.StopLoader();
    this._componentFactoryService.AddRestaurantCarousel({
      "data":data,
      "carouselType":carouselType
    });
  }

  ProceedTableBookingIntent(response){
    if(response["queryResult"]["allRequiredParamsPresent"])
    {
      let guestCount = response["queryResult"]["parameters"]["number"];
      let date:string = response["queryResult"]["parameters"]["date"];
      date = date.split("T")[0];
      let time:string = response["queryResult"]["parameters"]["time"];
      time = time.split("T")[1].split("+")[0];
      let restaurantData = this._stateService.getRestaurantBookingInitiateData();

      if(this.BookingDetailsAreFine(guestCount,date,time))
      { // Proceed for booking
        this._componentFactoryService.StartLoader();
        this._restaurantApiService.BookingInitiateForRestaurant({
          "noOfGuests":guestCount,
          "date":date,
          "time":time,
          "restaurantId":restaurantData["restaurantID"],
          "userName":restaurantData["userName"],
          "restaurantName":restaurantData["restaurantName"],
          "perPersonPoints":restaurantData["pointsPerPerson"],
          "pointBalance":restaurantData["pointBalance"]
        }).pipe(catchError(err => {
          this._componentFactoryService.StopLoader();
            this._componentFactoryService.AddTextBubble("Sorry, I am unable to proceed with the booking right now, Please try again later", "bot");
            return throwError(err);            
        }))
        .subscribe((data) => {
          // showing Checkout Card here - 
          this._componentFactoryService.AddRestaurantCheckoutCard(data);
          this._componentFactoryService.StopLoader();
        });
      }
    }else{
    this._componentFactoryService.AddTextBubble(response["queryResult"]["fulfillmentText"],"bot");
    }
  }

  ProcessBookingPaymentIntent(response){
    // processing booking payment
    this._componentFactoryService.AddTextBubble("Processing Payment of: "+response["totalPointPrice"]+" points for Booking-ID: "+response["bookingId"],"bot");

    this._componentFactoryService.StartLoader();

    this._restaurantApiService.BookingPaymentForRestaurant(response)
    .pipe(catchError(err => {
      this._componentFactoryService.StopLoader();
        this._componentFactoryService.AddTextBubble("Sorry, I am unable to proceed with payment of the booking, Please try again later", "bot");
        return throwError(err);            
    }))
    .subscribe((data) => {
          //updating user point balance on UI
          if(data["status"]== "Booking Successful"){
            this._stateService.pointBalance = data["pointBalance"];
          }
          // showing Booking Summary here - 
          this._componentFactoryService.AddBookingSummaryCard(data);
          this._componentFactoryService.StopLoader();
        });
  }

  CancelBookingInBackground(response){
    this._restaurantApiService.BookingCancellationForRestaurant(response)
    .pipe(catchError(err => {
      this._componentFactoryService.StopLoader();
        console.log(err);
        return throwError(err);            
    }))
    .subscribe((data) => {
    });
  }


  CancelBookingIntent(response){
    this._componentFactoryService.AddTextBubble("Processing Cancellation of Booking-ID: "+response["bookingId"],"bot");

    this._componentFactoryService.StartLoader();

    this._restaurantApiService.BookingCancellationForRestaurant(response)
    .pipe(catchError(err => {
      this._componentFactoryService.StopLoader();
        this._componentFactoryService.AddTextBubble("Sorry, I am unable to proceed with cancellation of this booking, Please try again later", "bot");
        return throwError(err);            
    }))
    .subscribe((data) => {
      //updating user point balance on UI
      if(data["status"]== "Cancelled"){
        this._stateService.pointBalance = data["updatedPointBalance"];
      }
      let pointBalance = this._stateService.pointBalance;
      // showing Cancellation message here - 
      if(data["status"]== "Cancelled"){
        this._componentFactoryService.AddTextBubble("Booking Cancelled for Booking-Id: "+data["bookingId"]+". Point Balance updated to "+pointBalance+" pts.","bot");
      }else{
        this._componentFactoryService.AddTextBubble("Booking Cancellation Failed for Booking-Id: "+data["bookingId"]+". Reason: "+data["error"],"bot");
      }
      this._componentFactoryService.StopLoader();
    });
  }

  BookingDetailsAreFine(guestCount,date,time){
    if(guestCount>15){
      this._componentFactoryService.AddTextBubble("You can only book upto 15 guests!","bot");
      this.IntentProcessing("swimming on "+date+" at "+time);
      return false;
    }else if(guestCount<1){
      this._componentFactoryService.AddTextBubble("I'd need atleast 1 guest for booking!","bot");
      this.IntentProcessing("swimming on "+date+" at "+time);
      return false;
    }else{
      return true;
    }
  }

  OrderFoodIntent(response) {
     
    if(response["queryResult"]["allRequiredParamsPresent"])
    {
        this._componentFactoryService.StartLoader();
        let city = response["queryResult"]["parameters"]["address"];

        this._foodOrderingService.GetRestaurantList(city,this._stateService.getLatitude(),this._stateService.getLongitude())
        .pipe(catchError(err => {
            this._componentFactoryService.AddTextBubble("Sorry, I am unable to process this request at the moment", "bot");
            this._componentFactoryService.StopLoader();
            return throwError(err);
        }))
        .subscribe((data) => {
            if(data===404){
              this._componentFactoryService.AddTextBubble("Sorry, I wasn't able to find any restaurants in your area.", "bot");
              this._componentFactoryService.StopLoader();
            }else{
              // show results here - 
              this._foodOrderingService.SetCarouselData(data);
              this._componentFactoryService.StopLoader();
              this._componentFactoryService.AddRestaurantCarousel({
                "data":data,
                "carouselType": "Food Ordering"
              });
            }
        });    
    }else{
      this._componentFactoryService.AddTextBubble(response["queryResult"]["fulfillmentText"], "bot");
    }
  }

  ShowFoodOrderMenu(response){
      this._componentFactoryService.AddTextBubble("I'll be able to show you the menu for the selected hotel in the next sprint ;) ","bot");
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
  GetPointBalanceIntent(response){
    this._componentFactoryService.AddTextBubble("Point Balance: "+this._stateService.pointBalance, "bot");
  }
}
