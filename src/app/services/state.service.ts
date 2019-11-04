import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class StateService {
  constructor() {}

  public bankName: string = "US Bank";
  public userFirstName: string = "Neelesh Singh Rajpurohit";
  public userID: string = "19345";
  public pointBalance = 999989;
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
      userName: this.userID,
      pointBalance: this.pointBalance
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
}
