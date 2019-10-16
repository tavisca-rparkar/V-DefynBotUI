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
  headers: HttpHeaders;

  constructor(private http: HttpClient) {}

  GetTheme(bankName: string): Observable<any> {
    let themesURL = "assets/themes/" + bankName + ".json";
    let theme = this.http.get<JSON>(themesURL);
    return theme;
  }
}
