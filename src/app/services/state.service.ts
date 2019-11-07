import { Injectable } from "@angular/core";
import { LauncherData } from '../models/launcherData';

@Injectable({
  providedIn: "root"
})
export class StateService {
  constructor() {}

  public appData:LauncherData = new LauncherData("","","","","",0,"","");
  public isAppDataSet:boolean = false;
  
  public CurrencyValueInPoints: number = 100;

  private _latitude: string;
  private _longitude: string;
  private _isLatLongProvided: boolean = false;
  private _restaurantBookingInitiateData: any;
  private _isBookingInitiated: boolean = false;
  private _bookTableData: any;


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
    supplier
  ) {
    let points = perPersonPrice * this.CurrencyValueInPoints; // converting price to points
    let restaurantIdWithSupplier = supplier + "/" + restaurantId;
    let data = {
      restaurantID: restaurantIdWithSupplier,
      restaurantName: restaurantName,
      pointsPerPerson: points,
      userName: this.appData.userFirstName,
      pointBalance: this.appData.pointBalance
    };
    this._restaurantBookingInitiateData = data;
    console.log(this._restaurantBookingInitiateData);
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
    console.log("Guest Count is - " + this._bookTableData["guestCount"]);
  }
  public getBookTableData() {
    return this._bookTableData;
  }

  setSessionData(launcherData:LauncherData){
    localStorage.setItem("sessionId",launcherData.sessionId);
    localStorage.setItem("userId",launcherData.userId);
    localStorage.setItem("environment",launcherData.environment);
    localStorage.setItem("client",launcherData.client);
    localStorage.setItem("userFirstName",launcherData.userFirstName);
    localStorage.setItem("pointBalance",launcherData.pointBalance.toString());
    localStorage.setItem("language",launcherData.language);
    localStorage.setItem("isLoggedIn","true");
  }

  getSessionData(){
    if(localStorage.getItem("isLoggedIn")=="true"){
      this.appData.sessionId = localStorage.getItem("sessionId");
      this.appData.userId = localStorage.getItem("userId");
      this.appData.environment = localStorage.getItem("environment");
      this.appData.client = localStorage.getItem("client");
      this.appData.userFirstName = localStorage.getItem("userFirstName");
      this.appData.pointBalance = parseInt(localStorage.getItem("pointBalance"));
      this.appData.language = localStorage.getItem("language");
      this.isAppDataSet = true;
    }   
  }

  clearSessionData(){
      localStorage.clear();
  }
}
