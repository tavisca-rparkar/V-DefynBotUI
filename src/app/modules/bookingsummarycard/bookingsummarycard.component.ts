import { Component, OnInit, Input } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { StateService } from 'src/app/services/state.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-bookingsummarycard",
  templateUrl: "./bookingsummarycard.component.html",
  styleUrls: ["./bookingsummarycard.component.css"]
})
export class BookingsummarycardComponent implements OnInit {
  @Input() data: string;
  isErrorDetected: boolean = false;
  disableAllButtons:boolean = false;
  status:string = "";
  pointBalance:number;
  /*data2 = {
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
  };*/

  constructor(private _componentFactoryService: ComponentFactoryService,
    private _stateService : StateService,
    private _appService : AppService) {}

  ngOnInit() {
    if (this.data["status"] == "Booking Successful") {
      this.isErrorDetected = false;
      this.status = "booked";
    } else {
      this.isErrorDetected = true;
      this.status = "cancelled";
    }
    this.pointBalance= this._stateService.appData.pointBalance;
  }

  ngAfterViewInit(): void {
    this._componentFactoryService.updateScroll();
  }

  cancelBooking(){
    this.disableAllButtons=true;
    let bookingCancelData ={
      "bookingId": this.data["bookingId"],
      "pointBalance": this._stateService.appData.pointBalance,
      "totalPointPrice": this.data["totalPointPrice"]
    }
    this._appService.IntentRouter("Cancel Booking",bookingCancelData);
  }
}
