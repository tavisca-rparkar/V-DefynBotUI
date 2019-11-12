import { Injectable } from '@angular/core';
import { LauncherData } from '../models/launcherData';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LauncherService {
  ApiUrl = "";
  constructor(private _http: HttpClient) { }

  SetUrl(url:string){
    this.ApiUrl = url+"launcher";
  }

  GetResponse(launcherData: LauncherData){
    let requestData = {
      "environment":launcherData.environment,
    "userId":launcherData.userId,
    "pointBalance":launcherData.pointBalance,
    "bank":launcherData.client,
    "locale":launcherData.language
  };

    let response= this._http.post(this.ApiUrl,requestData).pipe(timeout(10000));
  return response;
  }
}
