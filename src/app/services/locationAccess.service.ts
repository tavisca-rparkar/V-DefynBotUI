import { Injectable } from '@angular/core';
import { StateService } from './state.service';
import { ComponentFactoryService } from './ComponentFactory.service';

@Injectable({
  providedIn: 'root'
})
export class LocationAccessService {
  
  constructor(
    private _stateService:StateService,
    private _componentFactoryService:ComponentFactoryService
  ) {  }
  
  lat:number;
  lng:number;

   getLocation(): Promise<any> {
    return new Promise((resolve) => {
      if (navigator.geolocation) {
      
        navigator.geolocation.getCurrentPosition((position: Position) => {
          if (position) {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;
            console.log(this.lat+","+this.lng);
            //return lat+","+lng;
            this._stateService.setLatLng(this.lat+","+this.lng);
              console.log(this._stateService.IslatLongProvided());
          }
          console.log(this.lat+","+this.lng);
          resolve();
        },
          (error: PositionError) => {
            console.log(error);
            this._componentFactoryService.AddTextBubble("Please grant us your Browser location access and click on continue.","bot");
            this._componentFactoryService.addLocationButton();
            resolve();
          });
    } else {
      console.log("Browser not supported");
      resolve();
    }
    });
  }

  
}
