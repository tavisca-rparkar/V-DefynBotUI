import { Injectable } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { DialogflowApiService } from "./dialogflowApi.service";
import { catchError, delay } from "rxjs/operators";
import { throwError } from "rxjs";
import { MockableApiService } from "./mockableApi.service";
import { RestaurantApiService } from "./restaurant-api.service";
import { LocationAccessService } from "./locationAccess.service";
import { StateService } from "./state.service";
import { promise } from "protractor";
import { timeout, resolve } from "q";
import { FoodOrderingService } from "./food-ordering.service";
import { ApiCallType } from '../models/ApiCallType';
import { ApiCallMethod } from '../models/ApiCallMethod';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: "root"
})
export class AppService {
  constructor(
    private _componentFactoryService: ComponentFactoryService,
    private _dialogflowService: DialogflowApiService,
    private _mockableService: MockableApiService,
    private _restaurantApiService: RestaurantApiService,
    private _locationAccess: LocationAccessService,
    private _stateService: StateService,
    private _foodOrderingService: FoodOrderingService,
    private _loggerService: LoggerService
  ) {}

  async InitiateConversation() {
    await this._mockableService.GetResponse();
    this._locationAccess.getLocation().then(() => {
      if (this._stateService.IslatLongProvided()) {
        this.IntentProcessing("Hello");
      }
    });
    navigator.permissions.query({ name: "geolocation" }).then(result => {
      if (result.state == "granted") {
      } else if (result.state == "prompt") {
        this._componentFactoryService.AddTextBubble(
          "Please grant us your Browser location access.",
          "bot"
        );
        this._componentFactoryService.addLocationButton();
      } else {
        this._componentFactoryService.AddTextBubble(
          "Please grant us your Browser location access and click on reload.",
          "bot"
        );
        this._componentFactoryService.addLocationButton();
      }
    });
  }

  ProcessInput(userInput: string) {
    // print on screen
    this._componentFactoryService.AddTextBubble(userInput, "user");
    // send to dialogflow and call necessary functions
    if (this._stateService.IslatLongProvided()) {
      this.IntentProcessing(userInput);
    } else {
      this._componentFactoryService.AddTextBubble(
        "Please grant us your Browser location access.",
        "bot"
      );
      this._componentFactoryService.addLocationButton();
    }
  }

  IntentProcessing(userInput: string) {
    this._dialogflowService
      .GetResponse(userInput)
      .subscribe(response => {
        this.IntentRouter(
          response["queryResult"]["intent"]["displayName"],
          response
        );
      },
      error => {
        this._componentFactoryService.AddTextBubble(
          "Sorry, I am unable to help you at the moment. Please try again later.",
          "bot"
        );
      });
  }

  IntentRouter(intent: string, response) {
    switch (intent) {
      case "Welcome":
        this.WelcomeIntentIntent(response);
        break;
      case "Book Table":
        this.BookTableIntent(response);
        break;
      case "Proceed with current location":
        this.ProceedBookingWithCurrentLocation(response);
        break;
      case "Proceed with specific location":
        this.ProceedBookingWithSpecificLocation(response);
        break;
      case "Show Details":
        this.ShowDetailsIntent(response);
        break;
      case "Show Carousel Again":
        this.ShowCarouselAgainIntent(response);
        break;
      case "Proceed Table Booking":
        this.ProceedTableBookingIntent(response);
        break;
      case "Process Booking Payment":
        this.ProcessBookingPaymentIntent(response);
        break;
      case "Cancel Booking":
        this.CancelBookingIntent(response);
        break;
      case "After Cancellation Process":
        this.AfterCancellationProcessIntent(response);
        break;
      case "Fallback":
        this.FallbackIntent(response);
        break;
      case "Order Food":
        this.OrderFoodIntent(response);
        break;
      case "Show Menu":
        this.ShowFoodOrderMenu(response);
        break;
      case "Process Ordering Payment":
        this.ProcesssOrderingPaymentIntent(response);
        break;
      case "Get Point Balance":
        this.GetPointBalanceIntent(response);
        break;
      default:
        this.SmallTalkIntent(response);
        break;
    }
  }

  BookTableIntent(response) {
    if (response["queryResult"]["allRequiredParamsPresent"]) {
      this._componentFactoryService.StartLoader();
      let city = response["queryResult"]["parameters"]["address"];
      let guestCount = response["queryResult"]["parameters"]["number"];
      let date = response["queryResult"]["parameters"]["date"];
      let time = response["queryResult"]["parameters"]["time"];
      let showNearby = response["queryResult"]["parameters"]["nearby"];

      this._stateService.setBookTableData(city, guestCount, date, time);

      if(city == ""){
        if(showNearby != ""){
          // proceed to show results for browser Location
          this._restaurantApiService
          .GetRestaurantsList(
            "",
            this._stateService.getLatitude(),
            this._stateService.getLongitude()
          )
          .subscribe(data => {
            if (data === 404) {
              this._componentFactoryService.AddTextBubble(
                "Sorry, I wasn't able to find any restaurants in that area.",
                "bot"
              );
              this._componentFactoryService.StopLoader();
              // send flow to :  proceed with current location
              this.IntentProcessing("running");
            } else {
              // show results here -
              this._componentFactoryService.AddTextBubble("Showing you results near your location..." ,"bot");
              this._restaurantApiService.SetCarouselData(data);
              this._componentFactoryService.AddRestaurantCarousel({
                data: data,
                carouselType: "Restaurant Booking"
              });
              this._componentFactoryService.StopLoader();
            }
          },
          err => {
            this._componentFactoryService.AddTextBubble(
              "Sorry, I am unable to retrieve the response at this moment. Please try again later.",
              "bot"
            );
            this._componentFactoryService.StopLoader();
            return throwError(err);
          });
        }else{
          //ask for- do you want to see nearby hotels as per your current location or search for hotels in a specific area?
          this._componentFactoryService.StopLoader();
          this.IntentProcessing("running");
        }
      }
      else{
        // proceed to show results for specified city
        this._restaurantApiService
        .GetRestaurantsList(
          city,
          this._stateService.getLatitude(),
          this._stateService.getLongitude()
        )
        .subscribe(data => {
          if (data === 404) {
            this._componentFactoryService.AddTextBubble(
              "Sorry, I wasn't able to find any restaurants in that area.",
              "bot"
            );
            this._componentFactoryService.StopLoader();
          } else {
            // show results here -
            this._componentFactoryService.AddTextBubble("Showing you results in "+city+"..." ,"bot");
            this._restaurantApiService.SetCarouselData(data);
            this._componentFactoryService.AddRestaurantCarousel({
              data: data,
              carouselType: "Restaurant Booking"
            });
            this._componentFactoryService.StopLoader();
          }
        },
        err => {
          this._componentFactoryService.AddTextBubble(
            "Sorry, I am unable to retrieve the response at this moment",
            "bot"
          );
          this._componentFactoryService.StopLoader();
          return throwError(err);
        });
      }
    } else {
      this._componentFactoryService.AddTextBubble(
        response["queryResult"]["fulfillmentText"],
        "bot"
      );
    }
  }

  ProceedBookingWithCurrentLocation(response){
    if (response["queryResult"]["allRequiredParamsPresent"]) {
      this._componentFactoryService.StartLoader();
      let IsProceedWithLocation = response["queryResult"]["parameters"]["boolean"];
      if(IsProceedWithLocation == "yes"){
        // proceed to show results for browser Location
        this._restaurantApiService
        .GetRestaurantsList(
          "",
          this._stateService.getLatitude(),
          this._stateService.getLongitude()
        )
        .subscribe(data => {
          if (data === 404) {
            this._componentFactoryService.AddTextBubble(
              "Sorry, I wasn't able to find any restaurants in that area.",
              "bot"
            );
            this._componentFactoryService.StopLoader();
          } else {
            // show results here -
            this._componentFactoryService.AddTextBubble("Showing you results near your location..." ,"bot");
            this._restaurantApiService.SetCarouselData(data);
            this._componentFactoryService.StopLoader();
            this._componentFactoryService.AddRestaurantCarousel({
              data: data,
              carouselType: "Restaurant Booking"
            });
          }
        },
        err => {
          this._componentFactoryService.AddTextBubble(
            "Sorry, I am unable to retrieve the response at this moment",
            "bot"
          );
          this._componentFactoryService.StopLoader();
          return throwError(err);
        });
      }
      else{
        // ask for location to serve
        this._componentFactoryService.StopLoader();
        this.IntentProcessing("singing in");
      }
    }else{
      this._componentFactoryService.AddTextBubble(
        response["queryResult"]["fulfillmentText"],
        "bot"
      );
      this._componentFactoryService.AddChoiceButton([
        "Yes",
        "No"
      ]);
    }
  }

  ProceedBookingWithSpecificLocation(response){
    if (response["queryResult"]["allRequiredParamsPresent"]) {
      this._componentFactoryService.StartLoader();
      let city = response["queryResult"]["parameters"]["address"];
      // proceed to show results for browser Location
      this._restaurantApiService
      .GetRestaurantsList(
        city,
        this._stateService.getLatitude(),
        this._stateService.getLongitude()
      )
      .subscribe(data => {
        if (data === 404) {
          this._componentFactoryService.AddTextBubble(
            "Sorry, I wasn't able to find any restaurants in that area.",
            "bot"
          );
          this._componentFactoryService.StopLoader();
        } else {
          // show results here -
          this._componentFactoryService.AddTextBubble("Showing you results in "+city+"..." ,"bot");
          this._restaurantApiService.SetCarouselData(data);
          this._componentFactoryService.StopLoader();
          this._componentFactoryService.AddRestaurantCarousel({
            data: data,
            carouselType: "Restaurant Booking"
          });
        }
      },
      err => {
        this._componentFactoryService.AddTextBubble(
          "Sorry, I am unable to retrieve the response at this moment",
          "bot"
        );
        this._componentFactoryService.StopLoader();
        return throwError(err);
      });
    }else{
      this._componentFactoryService.AddTextBubble(
        response["queryResult"]["fulfillmentText"],
        "bot"
      );
    }
  }

  ShowDetailsIntent(response) {
    this._componentFactoryService.StartLoader();
    this._restaurantApiService
      .GetRestaurantDetails(response[0], response[1])
      .subscribe(data => {
        if (data === 404) {
          this._componentFactoryService.StopLoader();
          this._componentFactoryService.AddTextBubble(
            "Sorry, I am unable to fetch the selected restaurant details",
            "bot"
          );
        } else {
          // show results here -
          this._componentFactoryService.AddRestaurantDetailsCard(data);
          this._componentFactoryService.StopLoader();
        }
      },
      err => {
        this._componentFactoryService.AddTextBubble(
          "Sorry, I am unable to retrieve the response at the moment. Please try again later.",
          "bot"
        );
        this._componentFactoryService.StopLoader();
        return throwError(err);
      });
  }

  ShowCarouselAgainIntent(carouselType: string) {
    this._componentFactoryService.StartLoader();
    let data: any;
    if (carouselType == "Restaurant Booking") {
      data = this._restaurantApiService.GetCarouselData();
    } else if (carouselType == "Food Ordering") {
      data = this._foodOrderingService.GetCarouselData();
    }
    this._componentFactoryService.AddRestaurantCarousel({
      data: data,
      carouselType: carouselType
    });
    this._componentFactoryService.StopLoader();
  }

  ProceedTableBookingIntent(response) {
    if (response["queryResult"]["allRequiredParamsPresent"]) {
      let guestCount = response["queryResult"]["parameters"]["number"];
      let date: string = response["queryResult"]["parameters"]["date"];
      date = date.split("T")[0];
      let time: string = response["queryResult"]["parameters"]["time"];
      time = time.split("T")[1].split("+")[0];
      let restaurantData = this._stateService.getRestaurantBookingInitiateData();

      if (this.BookingDetailsAreFine(guestCount, date, time)) {
        // Proceed for booking
        this._componentFactoryService.StartLoader();
        this._restaurantApiService
          .BookingInitiateForRestaurant({
            noOfGuests: guestCount,
            date: date,
            time: time,
            restaurantId: restaurantData["restaurantID"],
            userName: restaurantData["userName"],
            restaurantName: restaurantData["restaurantName"],
            perPersonPoints: restaurantData["pointsPerPerson"],
            pointBalance: restaurantData["pointBalance"]
          })
          .subscribe(data => {
            // showing Checkout Card here -
            this._componentFactoryService.AddRestaurantCheckoutCard(data);
            this._componentFactoryService.StopLoader();
          },
          err => {
            this._componentFactoryService.AddTextBubble(
              "Sorry, I am unable to proceed with the booking right now, Please try again later",
              "bot"
            );
            this._componentFactoryService.StopLoader();
            return throwError(err);
          });
      }
    } else {
      this._componentFactoryService.AddTextBubble(
        response["queryResult"]["fulfillmentText"],
        "bot"
      );
    }
  }

  ProcessBookingPaymentIntent(response) {
    // processing booking payment
    this._componentFactoryService.AddTextBubble(
      "Processing Payment of: " +
        response["totalPointPrice"] +
        " points for Booking-ID: " +
        response["bookingId"],
      "bot"
    );

    this._componentFactoryService.StartLoader();

    this._restaurantApiService
      .BookingPaymentForRestaurant(response)
      .subscribe(data => {
        //updating user point balance on UI
        if (data["status"] == "Booking Successful") {
          this._stateService.appData.pointBalance = data["pointBalance"];
        }
        // showing Booking Summary here -
        this._componentFactoryService.AddBookingSummaryCard(data);
        this._componentFactoryService.StopLoader();
      },
      err => {
        this._componentFactoryService.AddTextBubble(
          "Sorry, I am unable to proceed with payment of the booking, Please try again later",
          "bot"
        );
        this._componentFactoryService.StopLoader();
        return throwError(err);
      });
  }

  CancelBookingInBackground(response) {
    this._restaurantApiService
      .BookingCancellationForRestaurant(response)
      .subscribe(data => {},
        err => {
          this._componentFactoryService.StopLoader();
          return throwError(err);
        });
  }

  CancelBookingIntent(response) {
    this._componentFactoryService.AddTextBubble(
      "Processing Cancellation of Booking-ID: " + response["bookingId"],
      "bot"
    );

    this._componentFactoryService.StartLoader();

    this._restaurantApiService.BookingCancellationForRestaurant(response)
    .subscribe((data) => {
      //updating user point balance on UI
      if(data["status"]== "Cancelled"){
        this._stateService.appData.pointBalance = data["updatedPointBalance"];
      }
      let pointBalance = this._stateService.appData.pointBalance;
      // showing Cancellation message here - 
      if(data["status"]== "Cancelled"){
        this._componentFactoryService.AddTextBubble("Booking Cancelled for Booking-Id: "+data["bookingId"]+". Point Balance updated to "+pointBalance+" pts.","bot");
        // "dancing" triggers dialogflow to initiate the After Cancellation Questioning... - for reference see: [After Cancellation Process Intent]
        this.IntentProcessing("dancing");
      }else{
        this._componentFactoryService.AddTextBubble("Booking Cancellation Failed for Booking-Id: "+data["bookingId"]+". Reason: "+data["error"],"bot");
      }
      this._componentFactoryService.StopLoader();
    },
    err => {
        this._componentFactoryService.AddTextBubble("Sorry, I am unable to proceed with cancellation of this booking, Please try again later", "bot");
        this._componentFactoryService.StopLoader();
        return throwError(err);            
    });
  }

  AfterCancellationProcessIntent(response){
    if (response["queryResult"]["allRequiredParamsPresent"]) {
      let IsBrowseMore = response["queryResult"]["parameters"]["boolean"];

      if(IsBrowseMore == "yes"){
        this.ShowCarouselAgainIntent("Restaurant Booking");
      }else{
        this.RestartConversationAfterEndOfIntent();
      }
    }else{
      this._componentFactoryService.AddTextBubble(
        response["queryResult"]["fulfillmentText"],
        "bot"
      );
      this._componentFactoryService.AddChoiceButton([
        "Yes",
        "No"
      ]);
    }
  }

  BookingDetailsAreFine(guestCount, date, time) {
    if (guestCount > 15) {
      this._componentFactoryService.AddTextBubble(
        "You can only book upto 15 guests!",
        "bot"
      );
      this.IntentProcessing("swimming on " + date + " at " + time);
      return false;
    } else if (guestCount < 1) {
      this._componentFactoryService.AddTextBubble(
        "I'd need atleast 1 guest for booking!",
        "bot"
      );
      this.IntentProcessing("swimming on " + date + " at " + time);
      return false;
    } else {
      return true;
    }
  }

  OrderFoodIntent(response) {
    if (response["queryResult"]["allRequiredParamsPresent"]) {
      alert("We only support food ordering for take-away!");
      this._componentFactoryService.StartLoader();
      let city = response["queryResult"]["parameters"]["address"];
      this._foodOrderingService.GetFoodOrderList(
          "",
          this._stateService.getLatitude(),
          this._stateService.getLongitude()
        )
        .subscribe(data => {
          if (data === 404) {
            this._componentFactoryService.AddTextBubble(
              "Sorry, I wasn't able to find any restaurants in "+city,
              "bot"
            );
            this._componentFactoryService.StopLoader();
          } else {
            // show results here -
            this._componentFactoryService.AddTextBubble("Showing you food ordering options near your location...","bot");
            this._foodOrderingService.SetCarouselData(data);
            this._componentFactoryService.StopLoader();
            this._componentFactoryService.AddRestaurantCarousel({
              data: data,
              carouselType: "Food Ordering"
            });
          }
        },
        err => {
          this._componentFactoryService.AddTextBubble(
            "Sorry, I am unable to process this request at the moment",
            "bot"
          );
          this._componentFactoryService.StopLoader();
          return throwError(err);
        });
    } else {
      this._componentFactoryService.AddTextBubble(
        response["queryResult"]["fulfillmentText"],
        "bot"
      );
    }
  }

  ShowFoodOrderMenu(response) {
    this._componentFactoryService.StartLoader();
    this._foodOrderingService
      .GetRestaurantMenu(response[0], response[1])
      .subscribe(data => {
        if (data === 404) {
          this._componentFactoryService.StopLoader();
          this._componentFactoryService.AddTextBubble(
            "Sorry, I am unable to fetch the menu of the selected restaurant",
            "bot"
          );
        } else {
          this._componentFactoryService.StopLoader();
          // show menu here -
          this._componentFactoryService.AddOrderingMenuCard(data); 
       }
      },
      err => {
        this._componentFactoryService.StopLoader();
        this._componentFactoryService.AddTextBubble(
          "Sorry, I am unable to fetch the menu of the selected restaurant",
          "bot"
        );
        return throwError(err);
      });
  }

  ProcesssOrderingPaymentIntent(response) {
    //process ordering payment
    this._componentFactoryService.AddTextBubble(
      "Placing your order...",
      "bot"
    );

    this._componentFactoryService.StartLoader();

    if (response.totalPoints > this._stateService.appData.pointBalance) {
      this._componentFactoryService.AddTextBubble(
        "You don't have enough points to complete this transaction",
        "bot"
      );
    } else {
      this._foodOrderingService
        .PaymentforFoodOrdering(response)
        .subscribe(data => {
          //updating user point balance on UI
          if(data["status"]== "Order Successful"){
            this._stateService.appData.pointBalance -= data["totalPoints"];
          }
          // showing Ordering Summary here -
          this._componentFactoryService.AddOrderingSummaryCard(data);
          this._componentFactoryService.StopLoader();
          this._componentFactoryService.AddTextBubble("Restaurant will notify you when your take-away order is ready.","bot");
        },
        err => {
          this._componentFactoryService.StartLoader();
          this._componentFactoryService.AddTextBubble(
            "Sorry, I am unable to proceed with payment of the order, Please try again later",
            "bot"
          );
          return throwError(err);
        });
    }
  }
  
  WelcomeIntentIntent(response) {
    this._componentFactoryService.AddTextBubble(
      response["queryResult"]["fulfillmentText"],
      "bot"
    );
    this._componentFactoryService.AddChoiceButton([
      "Book a Table",
      "Order Food"
    ]);
  }

  SmallTalkIntent(response) {
    this._componentFactoryService.AddTextBubble(
      response["queryResult"]["fulfillmentText"],
      "bot"
    );
  }

  FallbackIntent(response) {
    this._componentFactoryService.AddTextBubble(
      response["queryResult"]["fulfillmentText"],
      "bot"
    );
    this.RestartConversationAfterEndOfIntent();
  }
  GetPointBalanceIntent(response){
    this._componentFactoryService.AddTextBubble("Point Balance: "+this._stateService.appData.pointBalance, "bot");
  }

  RestartConversationAfterEndOfIntent(){
    this._componentFactoryService.AddTextBubble(
      "I can help you with the following-",
      "bot"
    );
    this._componentFactoryService.AddChoiceButton([
      "Book a Table",
      "Order Food"
    ]);
  }
}
