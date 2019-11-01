import { Component, OnInit, AfterViewInit, Input } from "@angular/core";

@Component({
  selector: "app-bookingcheckoutcard",
  templateUrl: "./bookingcheckoutcard.component.html",
  styleUrls: ["./bookingcheckoutcard.component.css"]
})
export class BookingCheckoutcardComponent implements OnInit, AfterViewInit {
  @Input() data: string;
  isErrorDetected: boolean = false;
  timer: number = 600;
  minutes: number;
  seconds: number;
  data2 = {
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

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.startCountdown(this.timer);
    if (this.data2["status"] == "BookingInitiated") {
      this.isErrorDetected = false;
    } else {
      this.isErrorDetected = true;
    }
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
        this.data2["error"] = "Session Expired!";
      }
    }, 1000);
  }
}
