import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { StateService } from "src/app/services/state.service";
import { Theme } from "src/app/models/theme";
import { ThemeService } from "src/app/services/theme.service";
import { Clients } from "src/app/clients/clients";
import { UserHistoryComponent } from "src/app/modules/booking-history/booking-history.component";
import { OrderingHistoryComponent } from "src/app/modules/ordering-history/ordering-history.component";
import { UserHistoryService } from 'src/app/services/user-history.service';

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {
  category: string = "booking";
  isLoading:boolean = true;

  constructor(
    private meta: Meta,
    private _router: Router,
    private _stateService: StateService,
    private _themingService: ThemeService,
    private _clients: Clients,
    private _userHistoryService: UserHistoryService
  ) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }

  ngOnInit() {
    if (localStorage.getItem("isLoggedIn") != "true") {
      window.open("./launcher","_self");
    } else {
      this._stateService.getSessionData();
      this._themingService.setActiveTheme(
        this._themingService.getTheme(this._stateService.appData.client)
      );
      if(!this._stateService.UserAskedForHistory){
        let routePath = this._clients.getClientId(this._stateService.appData.client);
        this._router.navigate(["./chatbot/" + routePath]);
      }else{
        this.GetBookingHistory();
      }
    }
  }

  setCategory(category) {
    this.isLoading = true;
    this.category = category;
    switch (this.category) {
      case "booking":
        this.GetBookingHistory();
        break;
      case "ordering":
        this.GetOrderingHistory();
        break;
    }
  }

  GetBookingHistory() {
    this._userHistoryService.GetBookingResponse().subscribe(
      response => {
        this._stateService.setBookingHistoryData(response);
        console.log("Booking history Done");
        this.isLoading = false;
      },
      err => {
        console.log("Booking history Done with error");
        console.log(err);
      }
    );
  }

  GetOrderingHistory() {
    this._userHistoryService.GetOrderingResponse().subscribe(
      response => {
        this._stateService.setOrderingHistoryData(response);
        console.log("Ordering history Done");
        this.isLoading = false;
      },
      err => {
        console.log("Order history Done with error");
        console.log(err);
      }
    );
  }

} 

