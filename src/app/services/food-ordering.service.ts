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
  private _foodOrderingInitiateApiUrl = "";
  private _foodOrderingPaymentApiUrl = "";
  private _carouselData;

  SetURL(listUrl: string, menuUrl: string, orderingUrl: string) {
    this._restaurantListApiUrl = listUrl;
    this._restaurantMenuApiUrl = menuUrl;
    this._foodOrderingInitiateApiUrl = orderingUrl;
  }

  SetCarouselData(data) {
    this._carouselData = data;
  }

  GetCarouselData(data) {
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

  GetRestaurantMenu(restId, supplier) {
    this._http.get(
      this._restaurantMenuApiUrl + restId + "&supplierName=" + supplier
    );
  }

  InitiateFoodOrdering(orderingData) {
    console.log(orderingData);

    let orderingDate = orderingData["date"];
    let orderingTime = orderingData["time"];
    let restaurantId = orderingData["restaurantId"];
    let userName = orderingData["userName"];
    let restaurantName = orderingData["restaurantName"];
    let totalBillPoints = orderingData["totalBillPoints"];
    let pointBalance = orderingData["pointBalance"];
    let foodItems = orderingData["foodItems"];
    let quantity = orderingData["quantity"];
    let perItemPrice = orderingData["perItemPrice"];

    /*return this._http.get(PUT URL here).pipe(timeout(5000));*/
  }

  MockInitiateFoodOrdering(bookingData) {
    console.log("Warning : Mock Api Called For Initiating Food Ordering !!!");
    //return this._http.get("http://demo8483055.mockable.io/mockbookingapi").pipe(timeout(5000));
  }

  ConfirmFoodOrdering(bookingData) {
    /*return this._http.get(PUT URL HERE).pipe(timeout(5000));*/
  }

  CancelFoodOrdering(bookingData) {
    /*return this._http.get(PUT URL HERE).pipe(timeout(5000));*/
  }

  GetMockRestaurantMenu() {
    const data = {
      restaurantId: 1,
      restaurantName: "Pizza Hut",
      locality: "Viman Nagar, Pune",
      supplierName: "Zomato",
      cards: [
        [
          { name: "name1", price: 350 },
          { name: "name2", price: 350 },
          { name: "name3", price: 350 },
          { name: "name4", price: 350 }
        ],
        [
          { name: "name5", price: 350 },
          { name: "name6", price: 350 },
          { name: "name7", price: 350 },
          { name: "name8", price: 350 }
        ]
      ]
    };
    return data;
  }

  GetMockRestaurantsList() {
    const restaurantList = [
      {
        restaurantId: 1,
        restaurantName: "Dominos Pizza",
        supplierName: "Zomato",
        locality: "Viman Nagar, Pune",
        userRatings: 5,
        cuisines: "Italian",
        image:
          "https://www.washingtonpost.com/resizer/M-WnldvRmvg3qyWg0Om8ssM6E3M=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/UM4VXMMJ5Y7T5MPQALWPL73RGM.jpg"
      },
      {
        restaurantId: 2,
        restaurantName: "La Pino's Pizza",
        supplierName: "Uber Eats",
        locality: "Raja Park, Jaipur",
        userRatings: 4.1,
        cuisines: "Italian",
        image:
          "http://images.jdmagicbox.com/comp/ahmedabad/q7/079pxx79.xx79.180505075834.p8q7/catalogue/la-pinoz-pizza-vastrapur-ahmedabad-pizza-outlets-8m4gg.jpg"
      },
      {
        restaurantId: 1,
        restaurantName: "Pizza Hut",
        supplierName: "Zomato",
        locality: "Flora Complex, Udaipur",
        userRatings: 1.8,
        cuisines: "Italian",
        image:
          "https://cdn.images.express.co.uk/img/dynamic/14/590x/Pizza-hut-piiza-817060.jpg"
      },
      {
        restaurantId: 2,
        restaurantName: "Aunty's Pizza",
        supplierName: "Uber Eats",
        locality: "Hunumangadh, Delhi",
        userRatings: 3.5,
        cuisines: "Italian",
        image:
          "http://img.tasteofcity.com/tasteimages/201602/image_original/C53FE067A86472A3_pizza-1.jpg"
      }
    ];
    return restaurantList;
  }
}
