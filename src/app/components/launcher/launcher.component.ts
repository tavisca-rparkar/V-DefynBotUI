import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LauncherData } from 'src/app/models/launcherData';
import { StateService } from 'src/app/services/state.service';
import { LauncherService } from 'src/app/services/launcher.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MockableApiService } from 'src/app/services/mockableApi.service';

@Component({
  selector: "app-launcher",
  templateUrl: "./launcher.component.html",
  styleUrls: ["./launcher.component.css"]
})
export class LauncherComponent implements OnInit {
  launcherData : LauncherData;

  constructor(private _router:Router, 
    private _stateService:StateService,
    private _launcherService:LauncherService,
    private mockableApiService: MockableApiService) {
    this.launcherData = new LauncherData("development","client-1","en-us","John Snow","RJ27",990000,"","");
  }

  async ngOnInit() {
    await this.mockableApiService.GetResponse();
    this._stateService.appData = new LauncherData("","","","","",0,"","");
    this._stateService.isAppDataSet = false;
  }

  redirect(){
    this._launcherService.GetResponse(this.launcherData)
    .pipe(catchError(err => {
      this.launcherData.error = "Sorry! Unable to connect at the momment.";
      console.log(this.launcherData.error);
      return throwError(err);
    }))
    .subscribe(response => {
      this.launcherData.sessionId = response["sessionId"];
      this._stateService.appData = this.launcherData;
      this._stateService.isAppDataSet = true;
      this._router.navigate(['./chatbot']);
    });
  }
}
