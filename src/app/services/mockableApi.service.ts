import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DialogflowApiService } from './dialogflowApi.service';
import { LocationApiService } from './locationApi.service';
import { RestaurantApiService } from './restaurant-api.service';

@Injectable({
  providedIn: 'root'
})

export class MockableApiService {

constructor(private _http: HttpClient, 
    private _dialogflowService: DialogflowApiService, 
    private _locationService: LocationApiService,
    private _restaurantApiService : RestaurantApiService
    ) { }

// Mockable.io URL for custom made Api for dialogflow key and api urls
private _apiUrl ="http://demo3711129.mockable.io/dialogflowAuthKey";

async GetResponse(){
  try {
      const data = await this._http.get(this._apiUrl)
                  .toPromise();
      this._dialogflowService.SetKey(data["key"]);
      this._locationService.SetURL(data["locationApiUrl"]);
      this._restaurantApiService.SetURL(data["restaurantApiUrl"],data["restaurantDetailsApiUrl"]);
    }
    catch (err) {
      return await Promise.resolve();
    };
  }
}
