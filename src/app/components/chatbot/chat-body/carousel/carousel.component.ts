import { Component, Input } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"]
})
export class CarouselComponent {
  @Input() data: string;

  slides = [
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

  activeSlideIndex = 0;

  constructor(private _componentFactoryService: ComponentFactoryService) {}
  ngAfterViewInit() {
    this._componentFactoryService.updateScroll();
  }

  showDetails(index: number) {
    alert("Selected Restaurant- " + this.slides[index]["restaurantName"]);
  }
}
