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
            this._stateService.setLatLng(this.lat.toString(),this.lng.toString());
          }
          resolve();
        },
          (error) => {
            console.log(error);
            //this._componentFactoryService.AddTextBubble("Please grant us your Browser location access and click on continue.","bot");
            //this._componentFactoryService.addLocationButton();
            resolve();
          },{timeout : 20000});
    } else {
      console.log("Browser not supported");
      resolve();
    }
    });
  }

  
}
