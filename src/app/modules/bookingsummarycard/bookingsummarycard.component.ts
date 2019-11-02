import { Component, OnInit, Input } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";

@Component({
  selector: "app-bookingsummarycard",
  templateUrl: "./bookingsummarycard.component.html",
  styleUrls: ["./bookingsummarycard.component.css"]
})
export class BookingsummarycardComponent implements OnInit {
  @Input() data2: string;
  isErrorDetected: boolean = false;
  status: string = "booked";
  data = {
    status: "BookingInitiated",
    error: null,
    totalPointPrice: 300,
    bookingId: 7,
    noOfGuests: 3,
    date: "2019-11-11T00:00:00",
    time: "11:59:59",
    restaurantId: "zomato/1",
    userName: "swar",
    restaurantName: "Novotel",
    perPersonPoints: 100,
    pointBalance: 1000
  };

  constructor(private _componentFactoryService: ComponentFactoryService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    if (this.data2["status"] == "BookingInitiated") {
      this.isErrorDetected = false;
    } else {
      this.isErrorDetected = true;
    }
    this._componentFactoryService.updateScroll();
  }
}
