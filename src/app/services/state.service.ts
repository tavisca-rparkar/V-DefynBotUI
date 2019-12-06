import { Injectable } from "@angular/core";
import { LauncherData } from "../models/launcherData";

@Injectable({
  providedIn: "root"
})
export class StateService {

  constructor() {}

  public appData: LauncherData = new LauncherData(
    "",
    "",
    "",
    "",
    "",
    0,
    "",
    ""
  );
  public isAppDataSet: boolean = false;
  public clientLogo: string;
  public UserAskedForHistory: boolean = false;
  public _foodOrderRestauranData: any;
  public IsBackButtonClicked: boolean = false;
  public _currentFlow= "Seeking user interaction";
  public _restaurantList:string[];
  public _restaurantLookupValue:number[];

  private _latitude: string;
  private _longitude: string;
  private _isLatLongProvided: boolean = false;
  private _restaurantBookingInitiateData: any;
  private _isBookingInitiated: boolean = false;
  private _bookTableData: any;
  private _bookingHistoryData: any;
  private _orderingHistoryData: any;

  public IslatLongProvided() {
    return this._isLatLongProvided;
  }
  public setLatLng(latitude: string, longitude: string) {
    this._latitude = latitude;
    this._longitude = longitude;
    this._isLatLongProvided = true;
  }
  public getLatitude() {
    return this._latitude;
  }
  public getLongitude() {
    return this._longitude;
  }

  public setRestaurantBookingInitiateData(
    restaurantId,
    restaurantName,
    perPersonPrice,
    supplier,
    latitude,
    longitude
  ) {
    let points = perPersonPrice; // price is already in points
    let restaurantIdWithSupplier = supplier + "/" + restaurantId;
    let data = {
      restaurantID: restaurantIdWithSupplier,
      restaurantName: restaurantName,
      pointsPerPerson: points,
      userId: this.appData.userId,
      pointBalance: this.appData.pointBalance,
      latitude: latitude,
      longitude: longitude
    };
    this._restaurantBookingInitiateData = data;
    this._isBookingInitiated = true;
  }
  public getRestaurantBookingInitiateData() {
    return this._restaurantBookingInitiateData;
  }
  public IsBookingInititated() {
    return this._isBookingInitiated;
  }

  public setBookTableData(city, guestCount, date, time) {
    this._bookTableData = {
      city: city,
      guestCount: guestCount,
      date: date,
      time: time
    };
  }
  public getBookTableData() {
    return this._bookTableData;
  }

  setSessionData(launcherData: LauncherData) {
    localStorage.setItem("sessionId", launcherData.sessionId);
    localStorage.setItem("userId", launcherData.userId);
    localStorage.setItem("environment", launcherData.environment);
    localStorage.setItem("client", launcherData.client);
    localStorage.setItem("userFirstName", launcherData.userFirstName);
    localStorage.setItem("pointBalance", launcherData.pointBalance.toString());
    localStorage.setItem("language", launcherData.language);
    localStorage.setItem("isLoggedIn", "true");
  }

  getSessionData() {
    if (localStorage.getItem("isLoggedIn") == "true") {
      this.appData.sessionId = localStorage.getItem("sessionId");
      this.appData.userId = localStorage.getItem("userId");
      this.appData.environment = localStorage.getItem("environment");
      this.appData.client = localStorage.getItem("client");
      this.appData.userFirstName = localStorage.getItem("userFirstName");
      this.appData.pointBalance = parseInt(
        localStorage.getItem("pointBalance")
      );
      this.appData.language = localStorage.getItem("language");
      this.isAppDataSet = true;
    }
  }

  clearSessionData() {
    localStorage.clear();
  }

  setBookingHistoryData(userBookingHistory) {
    this._bookingHistoryData = {
      isDataAvailable: userBookingHistory["isDataAvailable"],
      bookingHistories: userBookingHistory["bookingHistories"]
    };
  }

  getBookingHistoryData() {
    return this._bookingHistoryData;
  }

  setOrderingHistoryData(userOrderingHistory) {
    this._orderingHistoryData = {
      isDataAvailable: userOrderingHistory["isDataAvailable"],
      orderingHistories: userOrderingHistory["data"]
    };
  }

  getOrderingHistoryData() {
    return this._orderingHistoryData;
  }
  
  IndexRestaurants(data: any) {
    this.ReInitRestaurantIndexing();
    data.forEach(restaurant => {
      this._restaurantList.push(restaurant["restaurantName"]);
      this._restaurantLookupValue.push(0);
    });
    console.log(this._restaurantList.length);
  }

  ReInitRestaurantIndexing(){
   this._restaurantList = [];
   this._restaurantLookupValue = [];
  }

  RestaurantDataMatcher(restaurantSearchString:String):number{
    let words = restaurantSearchString.split(' ');
    let wordCount = words.length;
    let max = 0;
    let maxAtIndex = -1;

    words.forEach(word => {
      console.log("---"+word+"===");
      for(let i=0; i<this._restaurantList.length;i++){
        console.log(this._restaurantList[i]);
        if(this._restaurantList[i].toLowerCase().includes(word)){
          this._restaurantLookupValue[i]+=1;
          console.log("OOOOOOOOOOOOOOOOOOOO"+this._restaurantList[i]);
          if(this._restaurantLookupValue[i] > max){
            max= this._restaurantLookupValue[i];
            maxAtIndex = i;
          }
        }
      }
    });

    if(max > 0){
      return maxAtIndex;
    }else{
      return -1
    }
  }

}
