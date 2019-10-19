import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: "root"
})
export class LocationService {
  response: Response;

  constructor(private http: HttpClient) {}

  private ApiURL =
    "http://172.16.5.195:5000/api/restrauntsearch?localityverbose=";

  GetResponse(userInput: string) {
    return this.http.get(this.ApiURL + userInput);
  }
}
