import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DialogflowApiService } from './dialogflowApi.service';
import { LocationApiService } from './locationApi.service';

@Injectable({
  providedIn: 'root'
})

export class MockableApiService {

constructor(private _http: HttpClient, 
    private _dialogflowService: DialogflowApiService, 
    private _locationService: LocationApiService
    ) { }

// Mockable.io URL for custom made Api for dialogflow key and api urls
private _apiUrl ="https://demo8483055.mockable.io/dialogflowAuthKey";

async GetResponse(){
  try {
      const data = await this._http.get(this._apiUrl)
                  .toPromise();
      this._dialogflowService.SetKey(data["key"]);
      this._locationService.SetURL(data["locationApiUrl"]);
    }
    catch (err) {
      return await Promise.resolve();
    };
  }
}
