import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { timeout } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

export class LocationApiService {

  constructor(private _http: HttpClient) {}

  private _apiUrl = "bookingtable?locality=";

  SetURL(url: string) {
    this._apiUrl = url+"bookingtable?locality=";
  }
  
  GetResponse(userInput: string) {
    return this._http.get(this._apiUrl + userInput).pipe(timeout(10000));
  }
}
