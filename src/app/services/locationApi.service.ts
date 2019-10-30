import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { timeout } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})

export class LocationApiService {

  constructor(private _http: HttpClient) {}

  private _apiUrl =
    "http://172.16.5.195:5000/api/restrauntsearch?localityverbose=";

  SetURL(url: string) {
    this._apiUrl = url;
  }
  
  GetResponse(userInput: string) {
    return this._http.get(this._apiUrl + userInput).pipe(timeout(3000));
  }
}
