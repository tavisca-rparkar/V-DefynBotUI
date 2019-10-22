import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantApiService {

  constructor() { }

  GetMockRestaurantsList(city:string){
    console.log("fetching restaurants in - "+city);
    const restaurantList = [
      {
        "restaurantId": 1,
        "restaurantName": "Dominos Pizza",
        "supplierName": "Zomato",
        "locality": "Viman Nagar, Pune",
        "userRatings" : 5,
        "cuisines": "Italian",
        "thumbnailImage": "src\assets\images\dominos.jpg"
      },
      {
        "restaurantId": 2,
        "restaurantName": "La Pino's Pizza",
        "supplierName": "Uber Eats",
        "locality": "Viman Nagar, Pune",
        "userRatings" : 4,
        "cuisines": "Italian",
        "thumbnailImage": "src\assets\images\lapinospizza.jpg"
      },
      {
        "restaurantId": 1,
        "restaurantName": "Pizza Hut",
        "supplierName": "Zomato",
        "locality": "Viman Nagar, Pune",
        "userRatings" : 1,
        "cuisines": "Italian",
        "thumbnailImage": "src\assets\images\dominos.jpg"
      },
      {
        "restaurantId": 2,
        "restaurantName": "Aunty's Pizza",
        "supplierName": "Uber Eats",
        "locality": "Viman Nagar, Pune",
        "userRatings" : 3,
        "cuisines": "Italian",
        "thumbnailImage": "src\assets\images\lapinospizza.jpg"
      }
    ];
    return restaurantList;
  }
}
