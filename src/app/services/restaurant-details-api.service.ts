import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CardComponent } from "../modules/card/card.component";

@Injectable({
  providedIn: "root"
})
export class RestaurantDetailsApiService {
  constructor(private _http: HttpClient) {}

  private _dataURL = "src/assets/restaurantData/restaurantDetails.json";
  private _details;
  headers: HttpHeaders;

  CallRestaurantDetailsApi(restaurantId: string, supplierName: string) {
    this._details = this._http.get(this._dataURL);
  }

  GetRestaurantDetails() {
    let data = {
      restaurantName: this._details["restaurantDetails"]["restaurantName"],
      restaurantAddress: this._details["restaurantDetails"][
        "restaurantAddress"
      ],
      userRating: this._details["restaurantDetails"]["user_Rating"],
      cuisines: this._details["restaurantDetails"]["cuisines"],
      pricePerPerson: this._details["restaurantDetails"]["pricePerPerson"]
    };
  }
}
