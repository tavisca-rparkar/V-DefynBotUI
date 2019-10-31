import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }
  private _latlng:string;
  private _isLatLongProvided:boolean = false;

  public IslatLongProvided(){
    return this._isLatLongProvided;
  }
  public setLatLng(data:string){
    console.log(data);
    this._latlng=data;
    this._isLatLongProvided = true;
  }
  public getLatLng(){
    console.log(this._latlng);
    return this._latlng;
  }
}
