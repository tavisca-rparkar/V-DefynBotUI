import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { StateService } from "src/app/services/state.service";
import { Theme } from "src/app/models/theme";
import { ThemeService } from "src/app/services/theme.service";
import { Clients } from "src/app/clients/clients";
import { UserHistoryComponent } from "src/app/modules/booking-history/booking-history.component";
import { OrderingHistoryComponent } from "src/app/modules/ordering-history/ordering-history.component";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.css"]
})
export class HistoryComponent implements OnInit {
  category: string = "booking";
  constructor(
    private meta: Meta,
    private _router: Router,
    private _stateService: StateService,
    private _themingService: ThemeService,
    private _clients: Clients
  ) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }

  ngOnInit() {
    // if (localStorage.getItem("isLoggedIn") != "true") {
    //   this._router.navigate(["./launcher"]);
    // } else {
    //   this._stateService.getSessionData();
    //   this._themingService.setActiveTheme(
    //     this._themingService.getTheme(this._stateService.appData.client)
    //   );
    //   let routePath = this._clients.getClientId(
    //     this._stateService.appData.client
    //   );
    //   if (this._router.url !== "/chatbot/" + routePath) {
    //     alert(
    //       this._router.url +
    //         " --- " +
    //         "/chatbot/" +
    //         this._stateService.appData.client
    //     );
    //     this._router.navigate(["./launcher"]);
    //   }
    // }
  }

  setCategory(category) {
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

  GetBookingHistory() {}

  GetOrderingHistory() {}
}
