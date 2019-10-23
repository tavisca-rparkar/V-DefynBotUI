import { Component, OnInit, Input } from "@angular/core";
import { RestaurantDetailsApiService } from "src/app/services/restaurant-details-api.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {
  constructor(private restaurantDetailsService: RestaurantDetailsApiService) {}

  restaurantName: string = "Pizza Hut";
  restaurantAddress: string = "FC Road, Pune";
  userRating: string = "4.6";
  cuisines: string = "Italian, American";
  pricePerPerson: number = 5000;
  slides: string[] = [
    "https://b.zmtcdn.com/data/reviews_photos/ba0/f8479684d01cddc1d606c665107aeba0_1563545265.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
    "https://imgix.bustle.com/uploads/image/2019/4/9/e5e17083-273e-40f5-91cf-63a5ca339e99-ea3557c8-71a1-48e8-967f-4c166054baab-pizza-image_no-text.jpg?w=1020&h=574&fit=crop&crop=faces&auto=format&q=70",
    "https://dynl.mktgcdn.com/p/d9AXTJEWMZ156q11dLLVRHsmufNu0K-ng4JYb_4WwRI/1900x1427.jpg"
  ];
  activeSlideIndex = 0;

  ngOnInit() {}
}
