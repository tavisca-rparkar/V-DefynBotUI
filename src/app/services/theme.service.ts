import { Injectable } from "@angular/core";

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  private _themesURL = "assets/themes/bank-themes.json";
  headers: HttpHeaders;

  constructor(private http: HttpClient) {}

  GetTheme(): Observable<any> {
    var theme = this.http.get<JSON>(this._themesURL);
    return theme;
  }
}
