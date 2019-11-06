import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { timeout } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RestaurantApiService {
  constructor(private _http: HttpClient) {}
  private _restaurantListApiUrl =
  "http://172.16.5.151/api/bookingtable?";
  private _restaurantDetailsApiUrl =
  "http://172.16.5.143:5000/api/RestaurantDetails?restaurantId=";
  private _restaurantBookingApiUrl =
  "https://localhost:44367/api/booking?";
  private _restaurantBookingPaymentApiUrl =
  "https://localhost:44367/api/payment";
  private _restaurantBookingCancelApiUrl =
  "https://localhost:44367/api/cancel";
  private _carouselData;

  SetURL(listUrl: string, detailsUrl:string, bookingUrl:string, paymentUrl:string, cancelUrl:string) {
    this._restaurantListApiUrl = listUrl;
    this._restaurantDetailsApiUrl = detailsUrl;
    this._restaurantBookingApiUrl = bookingUrl;
    this._restaurantBookingPaymentApiUrl = paymentUrl;
    this._restaurantBookingCancelApiUrl = cancelUrl;
  }

  SetCarouselData(data){
    this._carouselData = data
  } 
  GetCarouselData(){
    return this._carouselData;
  }

  GetRestaurantsList(city:string, latitude:string, longitude:string){
    if(city==""){
      return this._http.get(this._restaurantListApiUrl+"latitude="+latitude+"&longitude="+longitude).pipe(timeout(15000));
    }else{
      return this._http.get(this._restaurantListApiUrl+"locality="+city+"&latitude="+latitude+"&longitude="+longitude).pipe(timeout(15000));
    }
  }

  GetRestaurantDetails(restId, supplier) {
    return this._http
      .get(this._restaurantDetailsApiUrl + restId + "&supplierName=" + supplier)
      .pipe(timeout(5000));
  }

  BookingInitiateForRestaurant(bookingData){
    console.log(bookingData);
    let noOfGuests = bookingData["noOfGuests"];
    let date = bookingData["date"];
    let time = bookingData["time"];
    let restaurantId = bookingData["restaurantId"];
    let userName = bookingData["userName"];
    let restaurantName = bookingData["restaurantName"];
    let perPersonPoints = bookingData["perPersonPoints"];
    let pointBalance = bookingData["pointBalance"];

    return this._http.get(this._restaurantBookingApiUrl+"noOfGuests="+noOfGuests+"&date="+date+"&time="+time+"&restaurantId="+restaurantId+"&userName="+userName+"&restaurantName="+restaurantName+"&perPersonPoints="+perPersonPoints+"&pointBalance="+pointBalance).pipe(timeout(5000));
  }

  MockBookingInitiateForRestaurant(bookingData){
    console.log("Warning : Mock Api Called For Initiating Booking For Restaurants !!!")
    return this._http.get("http://demo8483055.mockable.io/mockbookingapi").pipe(timeout(5000));
  }

  BookingPaymentForRestaurant(bookingPaymentData){
    return this._http.post(this._restaurantBookingPaymentApiUrl,{
      "bookingId":bookingPaymentData["bookingId"],
      "pointBalance":bookingPaymentData["pointBalance"],
      "restaurantName":bookingPaymentData["restaurantName"]
    }).pipe(timeout(5000));
  }

  BookingCancellationForRestaurant(bookingCancellationData){
    return this._http.post(this._restaurantBookingCancelApiUrl,{
      "bookingId":bookingCancellationData["bookingId"],
      "pointBalance":bookingCancellationData["pointBalance"],
      "totalPointPrice":bookingCancellationData["totalPointPrice"]
    }).pipe(timeout(5000));
  }

  GetMockRestaurantDetails(){
    const data = {
      restaurantId: 1,
      restaurantName: "Pizza Hut",
      supplierName: "Zomato",
      restaurantAddress:
        "Next to Vaishali Restaurant, Lane no. 5, FC Road, Pune",
      userRating: 4.6,
      cuisines: "Italian, American",
      images: [
        "https://b.zmtcdn.com/data/reviews_photos/ba0/f8479684d01cddc1d606c665107aeba0_1563545265.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
        "https://imgix.bustle.com/uploads/image/2019/4/9/e5e17083-273e-40f5-91cf-63a5ca339e99-ea3557c8-71a1-48e8-967f-4c166054baab-pizza-image_no-text.jpg?w=1020&h=574&fit=crop&crop=faces&auto=format&q=70",
        "https://dynl.mktgcdn.com/p/d9AXTJEWMZ156q11dLLVRHsmufNu0K-ng4JYb_4WwRI/1900x1427.jpg"
      ],
      pricePerPerson: 5000,
      latitude: 18.5208,
      longitude: 73.8412
    };
    return data;
  }

  GetMockRestaurantsList(){
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
