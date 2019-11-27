import { Component, OnInit, Input } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { StateService } from "src/app/services/state.service";
import { AppService } from "src/app/services/app.service";
import { RestaurantApiService } from "src/app/services/restaurant-api.service";

@Component({
  selector: "app-user-history",
  templateUrl: "./booking-history.component.html",
  styleUrls: ["./booking-history.component.css"]
})
export class UserHistoryComponent {
  @Input() isDataAvailable: boolean;
  @Input() bookingHistories: any;
  constructor(
    private _stateService: StateService,
    private _appService: AppService,
    private _restaurantApiService: RestaurantApiService
  ) {}

  cancelBooking(bookingId, finalBill, index) {
    if (
      confirm(
        "Are you sure you want to proceed with cancellation of this booking?"
      )
    ) {
      let bookingCancelData = {
        bookingId: bookingId,
        pointBalance: this._stateService.appData.pointBalance,
        totalPointPrice: finalBill
      };
      this.bookingHistories[index]["status"] = "Cancelled";
      this.bookingHistories[index]["isCancellable"] = false;
      this._restaurantApiService
        .BookingCancellationForRestaurant(bookingCancelData)
        .subscribe(
          response => {
            console.log(response);
          },
          err => {
            console.log(err);
          }
        );
    }
  }
}
