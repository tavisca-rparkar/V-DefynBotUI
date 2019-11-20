import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { timeout } from "rxjs/operators";
import { OrderingPaymentData } from '../models/OrderingPaymentData';

@Injectable({
  providedIn: "root"
})
export class FoodOrderingService {
  constructor(private _http: HttpClient) {}
  
  private _restaurantListApiUrl = "";
  private _restaurantMenuApiUrl = "";
  private _foodOrderingPaymentApiUrl = "";
  private _carouselData;

  SetURL(listUrl: string) {
    
    this._restaurantListApiUrl = listUrl + "restaurants?";
    this._restaurantMenuApiUrl = listUrl + "menuitems?";
    this._foodOrderingPaymentApiUrl=listUrl+"OrderPayment";
  }

  SetCarouselData(data) {
    this._carouselData = data;
  }

  GetCarouselData() {
    return this._carouselData;
  }

  GetFoodOrderList(city: string, latitude: string, longitude: string) {
    if ((city == "")) {
      return this._http
        .get(
          this._restaurantListApiUrl +
            "latitude=" +
            latitude +
            "&longitude=" +
            longitude
        )
        .pipe(timeout(15000));
    } else {
      return this._http
        .get(
          this._restaurantListApiUrl +
            "locality=" +
            city +
            "&latitude=" +
            latitude +
            "&longitude=" +
            longitude
        )
        .pipe(timeout(15000));
    }
  }

  GetRestaurantMenu(restaurantId: number, supplierName: string) {
    return this._http
      .get(
        this._restaurantMenuApiUrl +
        "restaurantid="+
          restaurantId+
          "&suppliername="+
          supplierName
      )
      .pipe(timeout(15000));
  }

  PaymentforFoodOrdering(orderingPaymentData:OrderingPaymentData) {   
    console.log(JSON.stringify(orderingPaymentData));
    return this._http
      .post(this._foodOrderingPaymentApiUrl, orderingPaymentData)
      .pipe(timeout(15000));
  }
}
