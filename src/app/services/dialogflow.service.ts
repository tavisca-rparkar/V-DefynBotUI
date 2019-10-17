import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams
} from "@angular/common/http";
import { Observable, throwError, from } from "rxjs";
import { catchError, tap, map, sample } from "rxjs/operators";
import { variable } from "@angular/compiler/src/output/output_ast";
import { JsonPipe } from "@angular/common";
import { Format, Text, QueryInput } from "src/app/components/dialogflow/format";
import { MockableService } from "./mockable.service";
import { async } from "q";

@Injectable({
  providedIn: "root"
})
export class DialogflowService {
  private productUrl =
    "https://dialogflow.googleapis.com/v2/projects/v-defynbot-rkixcd/agent/sessions/1235:detectIntent";
  headers: HttpHeaders;

  authKey =
    "Bearer ya29.c.Kl6bB9QLO_KFXilwTce3SRffe2o0WxTMyfJHjlscmPUzLm3kutIpxMuTAfp-kTyzKBTUCCJ3a4xfy-Ttkei520NDXe-m-4LPc087te-Ny3gkcuQvsSA56x7hEY5-Z6zX";

  //queryFormat.queryInput.text.text="";
  text: Text;
  queryInput: QueryInput;
  format: Format;

  constructor(
    private http: HttpClient,
    private mockableService: MockableService
  ) {}

  GetResponseMock(request: String) {
    let response = {
      intent: "Mock",
      message: "Hello User, This is a mock response from a mock server!"
    };
    return response;
  }

  GetResponse(userInput: string): Observable<JSON> {
    this.headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization:
        "Bearer ya29.c.Kl6bB06pyt8VF_b469K813dQEMaUTa9CoAcxvy_CedPxJP9P2ZFy0xW6ew3EJUekM8ea_JGBBRcISrjPCUdOaPTpJyafGwkNNbogsUxi3fK7U6GE2gwQcRqov2ZiT4A9"
    });
    //Body for dialogflow
    this.text = new Text();
    this.text.text = userInput;
    this.text.languageCode = "en";
    this.queryInput = new QueryInput();
    this.queryInput.text = this.text;
    this.format = new Format();
    this.format.queryInput = this.queryInput;
    //end of body of dialogflow

    var sample = this.http.post<JSON>(
      this.productUrl,
      JSON.stringify(this.format),
      { headers: this.headers, responseType: "json" }
    );
    return sample;
  }
}
