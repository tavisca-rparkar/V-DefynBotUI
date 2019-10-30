import { Component, Input } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"]
})
export class CarouselComponent {
  @Input() data: string;

  constructor(
    private _componentFactoryService: ComponentFactoryService,
    private _appService: AppService
  ) {}
  ngAfterViewInit() {
    this._componentFactoryService.updateScroll();
  }

  showDetails(index: number) {
    const request = [
      this.data[index]["restaurantId"],
      this.data[index]["supplierName"]
    ];
    this._appService.IntentRouter("Show Details", request);
  }

  slides = [
    {
      image:
        "https://b.zmtcdn.com/data/reviews_photos/ba0/f8479684d01cddc1d606c665107aeba0_1563545265.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
    },
    {
      image:
        "https://imgix.bustle.com/uploads/image/2019/4/9/e5e17083-273e-40f5-91cf-63a5ca339e99-ea3557c8-71a1-48e8-967f-4c166054baab-pizza-image_no-text.jpg?w=1020&h=574&fit=crop&crop=faces&auto=format&q=70"
    },
    {
      image:
        "https://dynl.mktgcdn.com/p/d9AXTJEWMZ156q11dLLVRHsmufNu0K-ng4JYb_4WwRI/1900x1427.jpg"
    }
  ];
}
