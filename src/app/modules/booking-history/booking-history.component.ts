import { Component, OnInit, Input } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";

@Component({
  selector: "app-user-history",
  templateUrl: "./booking-history.component.html",
  styleUrls: ["./booking-history.component.css"]
})
export class UserHistoryComponent implements OnInit {
  @Input() data: string;
  data2 = [
    {
      status: "Booked",
      totalPointPrice: 300,
      bookingId: 7,
      noOfGuests: 3,
      date: "2019-11-11",
      time: "11:59:59",
      restaurantName: "Novotel",
      perPersonPoints: 100,
      isCancellable: true
    },
    {
      status: "Booked",
      totalPointPrice: 300,
      bookingId: 7,
      noOfGuests: 3,
      date: "2019-11-11",
      time: "11:59:59",
      restaurantName: "Novotel",
      perPersonPoints: 100,
      isCancellable: false
    },
    {
      status: "Booked",
      totalPointPrice: 300,
      bookingId: 7,
      noOfGuests: 3,
      date: "2019-11-11",
      time: "11:59:59",
      restaurantName: "Novotel",
      perPersonPoints: 100,
      isCancellable: true
    },
    {
      status: "Booked",
      totalPointPrice: 300,
      bookingId: 7,
      noOfGuests: 3,
      date: "2019-11-11",
      time: "11:59:59",
      restaurantName: "Novotel",
      perPersonPoints: 100,
      isCancellable: true
    },
    {
      status: "Cancelled",
      totalPointPrice: 300,
      bookingId: 7,
      noOfGuests: 3,
      date: "2019-11-11",
      time: "11:59:59",
      restaurantName: "Novotel",
      perPersonPoints: 100,
      isCancellable: false
    }
  ];
  constructor(private _componentFactoryService: ComponentFactoryService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    //this._componentFactoryService.updateScroll();
  }
}
