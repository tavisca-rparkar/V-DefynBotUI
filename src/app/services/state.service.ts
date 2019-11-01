import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }
  
  private _latitude:string;
  private _longitude:string;
  private _isLatLongProvided:boolean = false;
  private _restaurantBookingInitiateData:any;
  private _isBookingInitiated:boolean = false;
  private _bookTableData:any;

  public IslatLongProvided(){
    return this._isLatLongProvided;
  }
  public setLatLng(latitude:string,longitude:string){
    this._latitude= latitude;
    this._longitude=longitude;
    this._isLatLongProvided = true;
  }
  public getLatitude(){
    
    return this._latitude;
  }
  public getLongitude()
  {
    return this._longitude;
  }
  public setRestaurantBookingData(data:any){
    this._restaurantBookingInitiateData = data;
    this._isBookingInitiated =true;
  }
  public getRestaurantBookingData(){
    return this._restaurantBookingInitiateData;
  }
  public IsBookingInititated(){
    return this._isBookingInitiated;
  }

  public setBookTableData(city,guestCount,date,time){
    this._bookTableData = {
      "city" : city,
      "guestCount": guestCount,
      "date":date,
      "time":time
    };
    console.log("Guest Count is - "+this._bookTableData["guestCount"]);
  }
  public getBookTableData(){
    return this._bookTableData;
  }
}
