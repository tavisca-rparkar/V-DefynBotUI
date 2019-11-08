import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { timeout } from "rxjs/operators";

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
    this._restaurantListApiUrl = listUrl;
  }

  SetCarouselData(data) {
    this._carouselData = data;
  }

  GetCarouselData() {
    return this._carouselData;
  }

  GetRestaurantList(city: string, latitude: string, longitude: string) {
    if ((city = "")) {
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
          restaurantId +
          "&supplierName=" +
          supplierName
      )
      .pipe(timeout(5000));
  }

  PaymentforFoodOrdering(orderingPaymentData) {
    return this._http
      .post(this._foodOrderingPaymentApiUrl, {
        restaurantId: orderingPaymentData["restaurantId"],
        restaurantName: orderingPaymentData["restaurantName"],
        userId: orderingPaymentData["userId"],
        totalPoints: orderingPaymentData["totalPoints"],
        menuItems: orderingPaymentData["menuItems"]
      })
      .pipe(timeout(5000));
  }
}
