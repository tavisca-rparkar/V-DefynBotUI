import {
  Component,
  OnInit,
  Input,
  ViewChild,
  HostListener
} from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { AppService } from "src/app/services/app.service";
import { StateService } from "src/app/services/state.service";
import { MatCarousel, MatCarouselComponent } from "@ngmodule/material-carousel";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {
  @ViewChild("carousel", { static: true }) public el: any;

  @HostListener("swipeleft", ["$event"]) public swipePrev(event: any) {
    this.el.previousSlide();
  }

  @HostListener("swiperight", ["$event"]) public swipeNext(event: any) {
    this.el.nextSlide();
  }
  constructor(
    private _componentFactoryService: ComponentFactoryService,
    private _appService: AppService,
    private _stateService: StateService
  ) {}

  @Input() data: string;
  activeSlideIndex = 0;

  ngOnInit() {}

  ngAfterViewInit() {
    let str = this.data["cuisines"];
    this.data["cuisines"] = str.join(", ");
    setTimeout(() => {
      this._componentFactoryService.updateScroll();
    }, 600);
  }

  proceedForBooking() {
    //setting restaurant detials in stateService
    this._stateService.setRestaurantBookingInitiateData(
      this.data["restaurantId"],
      this.data["restaurantName"],
      this.data["pricePerHead"],
      this.data["supplierName"],
      this.data["lat"],
      this.data["lon"]
    );
    // sending intent for Booking Initiation
    let requestString = "swimming";
    let BookTableData = this._stateService.getBookTableData();

    if (BookTableData["guestCount"] != "") {
      requestString += " for " + BookTableData["guestCount"] + " people";
    }
    if (BookTableData["date"] != "") {
      requestString += " on " + BookTableData["date"].split("T")[0];
    }
    if (BookTableData["time"] != "") {
      let time: string = BookTableData["time"].split("T")[1];
      requestString += " at " + time.split("+")[0];
    }

    this._appService.IntentProcessing(requestString);
  }

  showRestaurantList() {
    this._appService.IntentRouter("Show Carousel Again", "Restaurant Booking");
  }
}
