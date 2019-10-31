import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }
  
  private _latitude:string;
  private _longitude:string;

  private _isLatLongProvided:boolean = false;

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
}
