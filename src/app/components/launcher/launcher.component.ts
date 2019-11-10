import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LauncherData } from "src/app/models/launcherData";
import { StateService } from "src/app/services/state.service";
import { LauncherService } from "src/app/services/launcher.service";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { MockableApiService } from "src/app/services/mockableApi.service";
import { ThemeService } from "src/app/services/theme.service";

@Component({
  selector: "app-launcher",
  templateUrl: "./launcher.component.html",
  styleUrls: ["./launcher.component.css"]
})
export class LauncherComponent implements OnInit {
  launcherData: LauncherData;
  isErrorDetected = false;

  constructor(
    private _router: Router,
    private _stateService: StateService,
    private _launcherService: LauncherService,
    private _themingService: ThemeService,
    private mockableApiService: MockableApiService
  ) {
    this.launcherData = new LauncherData(
      "development",
      "US Bank",
      "en-us",
      "John Snow",
      "RJ27",
      990000,
      "",
      ""
    );
  }

  async ngOnInit() {
    await this.mockableApiService.GetResponse();
    this._stateService.appData = new LauncherData(
      "",
      "",
      "",
      "",
      "",
      0,
      "",
      ""
    );
    this._stateService.isAppDataSet = false;
    this._stateService.clearSessionData();
  }

  redirect() {
    this._launcherService
      .GetResponse(this.launcherData)
      .pipe(
        catchError(err => {
          this.launcherData.error = "Sorry! Unable to connect at the momment.";
          console.log(this.launcherData.error);
          this.isErrorDetected = true;
          console.log(err);
          return throwError(err);
        })
      )
      .subscribe(response => {
        this.launcherData.sessionId = response["sessionId"];
        this._stateService.setSessionData(this.launcherData);
        this._stateService.appData = this.launcherData;
        this._stateService.isAppDataSet = true;
        // Theming -------------------------------------------------------------
        this._themingService.setActiveTheme(
          this._themingService.getTheme(this.launcherData.client)
        );  //------------------------------------------------------------------
        this._router.navigate(["./chatbot"]);
      });
  }
}
