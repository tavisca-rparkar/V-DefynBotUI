import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DialogflowService } from './dialogflow.service';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class MockableService {
  response: Response;
  _startupData: any;

  constructor(private http: HttpClient, private dialogflowService: DialogflowService, private locationService: LocationService) { }

  private ApiURL ="https://demo8483055.mockable.io/dialogflowAuthKey";

    async GetResponse(){
      try {
        const data = await this.http.get(this.ApiURL)
          .toPromise();
        this._startupData = data;
        this.dialogflowService.SetKey(data["key"]);
        this.locationService.SetURL(data["url"]);
      }
      catch (err) {
        return await Promise.resolve();
      };
    }
}
