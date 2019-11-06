import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LauncherData } from 'src/app/models/launcherData';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: "app-launcher",
  templateUrl: "./launcher.component.html",
  styleUrls: ["./launcher.component.css"]
})
export class LauncherComponent implements OnInit {
  launcherData : LauncherData;

  constructor(private _router:Router, private _stateService:StateService) {
    this.launcherData = new LauncherData("development","client-1","en-us","John Snow","RJ27",990000);
  }

  ngOnInit() {
    this._stateService.appData = new LauncherData("","","","","",0);
    this._stateService.isAppDataSet = false;
  }

  redirect(){
    this._stateService.appData = this.launcherData;
    this._stateService.isAppDataSet = true;
    this._router.navigate(['./chatbot']);
  }
}
