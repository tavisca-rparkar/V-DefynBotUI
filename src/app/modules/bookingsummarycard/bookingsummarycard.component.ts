import { Component, OnInit, Input } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { StateService } from "src/app/services/state.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-bookingsummarycard",
  templateUrl: "./bookingsummarycard.component.html",
  styleUrls: ["./bookingsummarycard.component.css"]
})
export class BookingsummarycardComponent implements OnInit {
  @Input() data: string;
  isErrorDetected: boolean = false;
  disableAllButtons: boolean = false;
  status: string = "";
  pointBalance: number;

  constructor(
    private _componentFactoryService: ComponentFactoryService,
    private _stateService: StateService,
    private _appService: AppService
  ) {}

  ngOnInit() {
    if (this.data["status"] == "Booking Successful") {
      this.isErrorDetected = false;
      this.status = "booked";
    } else {
      this.isErrorDetected = true;
      this.status = "cancelled";
    }
    this.pointBalance = this._stateService.appData.pointBalance;
  }

  ngAfterViewInit(): void {
    this._componentFactoryService.updateScroll();
  }

  cancelBooking() {
    if (
      confirm(
        "Are you sure you want to proceed with cancellation of this booking?"
      )
    ) {
      this.disableAllButtons = true;
      let bookingCancelData = {
        bookingId: this.data["bookingId"],
        pointBalance: this._stateService.appData.pointBalance,
        totalPointPrice: this.data["totalPointPrice"]
      };
      this._appService.IntentRouter("Cancel Booking", bookingCancelData);
    }
  }
}
