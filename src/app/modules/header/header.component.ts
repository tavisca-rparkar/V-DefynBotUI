import { Component, OnInit, Input } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AppService } from "src/app/services/app.service";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { UserHistoryService } from "src/app/services/user-history.service";
import { StateService } from "src/app/services/state.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Input() bankName: string;
  @Input() userFirstName: string;
  @Input() pointBalance: number;
  @Input() clientLogo: string;

  constructor(
    private meta: Meta,
    private _router: Router,
    private _appService: AppService,
    private _componentFactoryService: ComponentFactoryService,
    private _userHistoryService: UserHistoryService,
    private _stateService: StateService
  ) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }
  ngOnInit() {
    
  }

  logout() {
    localStorage.clear();
    window.open("./launcher","_self");
  }

  ViewPastTransactions() {

    // this._userHistoryService.GetOrderingResponse().subscribe(
    //   response => {
    //     this._stateService.setOrderingHistoryData(response);
    //     console.log("Ordering history Done");
    //   },
    //   err => {
    //     console.log("Order history Done with error");
    //     console.log(err);
    //   }
    // );

    // this._userHistoryService.GetBookingResponse().subscribe(
    //   response => {
    //     this._stateService.setBookingHistoryData(response);
    //     console.log("Booking history Done");
    //   },
    //   err => {
    //     console.log("Booking history Done with error");
    //     console.log(err);
    //   }
    // );
    this._stateService.UserAskedForHistory = true;
    this._router.navigate(["./history"]);
  }
}
