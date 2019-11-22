import { Component, OnInit, Input } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { AppService } from "src/app/services/app.service";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { UserHistoryService } from "src/app/services/user-history.service";
import { StateService } from "src/app/services/state.service";
import { throwError } from "rxjs";

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
  ngOnInit() {}

  logout() {
    localStorage.clear();
    this._router.navigate(["./launcher"]);
  }

  ViewPastTransactions() {
    this._componentFactoryService.StartLoader();
    this._userHistoryService.GetBookingResponse().subscribe(
      response => {
        console.log(response);
        this._stateService.setBookingHistoryData(response);
      },
      err => {
        this._componentFactoryService.StopLoader();
        return throwError(err);
      }
    );
    this._userHistoryService.GetOrderingResponse().subscribe(
      response => {
        this._stateService.setOrderingHistoryData(response);
      },
      err => {
        this._componentFactoryService.StopLoader();
        return throwError(err);
      }
    );
    this._componentFactoryService.StopLoader();
    this._router.navigate(["./history"]);
  }
}
