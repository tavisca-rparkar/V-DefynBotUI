import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DialogflowApiService } from "./dialogflowApi.service";
import { LocationApiService } from "./locationApi.service";
import { RestaurantApiService } from "./restaurant-api.service";
import { FoodOrderingService } from "./food-ordering.service";
import { LauncherService } from "./launcher.service";
import { Observable } from "rxjs";
import { UserHistoryService } from "./user-history.service";

@Injectable({
  providedIn: "root"
})
export class MockableApiService {
  constructor(
    private _http: HttpClient,
    private _dialogflowService: DialogflowApiService,
    private _locationService: LocationApiService,
    private _restaurantApiService: RestaurantApiService,
    private _foodOrderingService: FoodOrderingService,
    private _launcherService: LauncherService,
    private _userHistoryService: UserHistoryService
  ) {}

  // Mockable.io URL for custom made Api for dialogflow key and api urls
  private _apiUrl = "https://demo8483055.mockable.io/dialogflowAuthKey";

  GetResponse() {
    const dataObservable: Observable<Object> = this._http.get(this._apiUrl);
    dataObservable.subscribe(data => {
      this._dialogflowService.SetKey(data["key"]);
      this._dialogflowService.SetUrl(data["ApiBaseUrl"]);
      this._locationService.SetURL(data["ApiBaseUrl"]);
      this._restaurantApiService.SetURL(data["ApiBaseUrl"]);
      this._launcherService.SetUrl(data["ApiBaseUrl"]);
      this._foodOrderingService.SetURL(data["ApiBaseUrl"]);
      this._userHistoryService.SetUrl(data["ApiBaseUrl"]);
    });
    return dataObservable;
  }
}
