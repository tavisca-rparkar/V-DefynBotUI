import { Component, OnInit, AfterViewInit, Input } from "@angular/core";
import { ComponentFactoryService } from 'src/app/services/ComponentFactory.service';
import { StateService } from 'src/app/services/state.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-bookingcheckoutcard",
  templateUrl: "./bookingcheckoutcard.component.html",
  styleUrls: ["./bookingcheckoutcard.component.css"]
})
export class BookingCheckoutcardComponent implements OnInit, AfterViewInit {
  @Input() data: string;
  isErrorDetected: boolean = false;
  disableAllButtons:boolean = false;
  timer: number = 600;
  minutes: number;
  seconds: number;
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

  constructor(private _componentFactoryService:ComponentFactoryService,
    private _stateService: StateService,
    private _appService: AppService) {}

  ngOnInit() {
this.pointBalance= this._stateService.pointBalance;
  }

  ngAfterViewInit(): void {
    if (this.data["status"] == "BookingInitiated") {
      this.isErrorDetected = false;
    } else {
      this.isErrorDetected = true;
    }
    this.startCountdown(this.timer);
    this._componentFactoryService.updateScroll();
  }

  startCountdown(seconds) {
    var counter = seconds;

    var interval = setInterval(() => {
      this.minutes = Math.floor((counter % (60 * 60)) / 60);
      this.seconds = Math.floor(counter % 60);
      counter--;

      if (counter < 0) {
        clearInterval(interval);
        this.isErrorDetected = true;
        this.data["error"] = "Session Expired!";
      }
    }, 1000);
  }

  proceedToPay(){
    this.disableAllButtons=true;
    let bookingPaymentData = {
      "bookingId": this.data["bookingId"],
      "pointBalance": this._stateService.pointBalance,
      "restaurantName":this.data["restaurantName"],
      "totalPointPrice": this.data["totalPointPrice"]
    };
    this._appService.IntentRouter("Process Booking Payment",bookingPaymentData);
  }

  cancelBooking(){
    this.disableAllButtons=true;
    let bookingCancelData ={
      "bookingId": this.data["bookingId"],
      "pointBalance": this._stateService.pointBalance,
      "totalPointPrice": this.data["totalPointPrice"]
    }
    this._appService.IntentRouter("Cancel Booking",bookingCancelData);
  }

}
