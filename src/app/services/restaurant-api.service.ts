import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestaurantApiService {

  constructor(private _http: HttpClient) { }
  private _restaurantApiUrl =
  "http://172.16.5.151/api/bookingtable?locality=";

  SetURL(url: string) {
    this._restaurantApiUrl = url;
  }

  GetRestaurantsList(city:string){
    return this._http.get(this._restaurantApiUrl + city).pipe(timeout(15000));
  }
  

  GetMockRestaurantsList(city:string){
    console.log("(RestaurantApiService)fetching restaurants in - "+city);
    const restaurantList = [{
      "restaurantId": 1,
      "restaurantName": "Dominos Pizza",
      "supplierName": "Zomato",
      "locality": "Viman Nagar, Pune",
      "userRatings" : 5,
      "cuisines": "Italian",
      "image": "https://www.washingtonpost.com/resizer/M-WnldvRmvg3qyWg0Om8ssM6E3M=/1484x0/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/UM4VXMMJ5Y7T5MPQALWPL73RGM.jpg"
    },
    {
      "restaurantId": 2,
      "restaurantName": "La Pino's Pizza",
      "supplierName": "Uber Eats",
      "locality": "Raja Park, Jaipur",
      "userRatings" : 4.1,
      "cuisines": "Italian",
      "image": "http://images.jdmagicbox.com/comp/ahmedabad/q7/079pxx79.xx79.180505075834.p8q7/catalogue/la-pinoz-pizza-vastrapur-ahmedabad-pizza-outlets-8m4gg.jpg"
    },
    {
      "restaurantId": 1,
      "restaurantName": "Pizza Hut",
      "supplierName": "Zomato",
      "locality": "Flora Complex, Udaipur",
      "userRatings" : 1.8,
      "cuisines": "Italian",
      "image": "https://cdn.images.express.co.uk/img/dynamic/14/590x/Pizza-hut-piiza-817060.jpg"
    },
    {
      "restaurantId": 2,
      "restaurantName": "Aunty's Pizza",
      "supplierName": "Uber Eats",
      "locality": "Hunumangadh, Delhi",
      "userRatings" : 3.5,
      "cuisines": "Italian",
      "image": "http://img.tasteofcity.com/tasteimages/201602/image_original/C53FE067A86472A3_pizza-1.jpg"
    }];
    return restaurantList;
  }


}
