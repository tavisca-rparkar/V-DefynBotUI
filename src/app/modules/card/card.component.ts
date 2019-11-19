import { Component, OnInit, Input } from "@angular/core";
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
  constructor(
    private _componentFactoryService: ComponentFactoryService,
    private _appService: AppService,
    private _stateService: StateService
  ) {}

  @Input() data: string;
  activeSlideIndex = 0;

  ngOnInit() {}

  ngAfterViewInit() {
    this._componentFactoryService.updateScroll();
    let str = this.data["cuisines"];
    this.data["cuisines"] = str.join(", ");
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
    let requestString = "V-defyn001 date is";
    let BookTableData = this._stateService.getBookTableData();
    
    if (BookTableData["date"] != "") {
      requestString += BookTableData["date"].split("T")[0];
    }
    
    /*
    if (BookTableData["guestCount"] != "") {
      requestString += " for " + BookTableData["guestCount"] + " people";
    }
    if (BookTableData["date"] != "") {
      requestString += " on " + BookTableData["date"].split("T")[0];
    }
    if (BookTableData["time"] != "") {
      let time: string = BookTableData["time"].split("T")[1];
      requestString += " at " + time.split("+")[0];
    }*/

    this._appService.IntentProcessing(requestString);
  }

  showRestaurantList() {
    this._appService.IntentRouter("Show Carousel Again", "Restaurant Booking");
  }
}
