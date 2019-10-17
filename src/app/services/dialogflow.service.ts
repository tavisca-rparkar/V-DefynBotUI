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

@Injectable({
  providedIn: "root"
})
export class DialogflowService {
  private productUrl =
    "https://dialogflow.googleapis.com/v2/projects/v-defynbot-rkixcd/agent/sessions/1235:detectIntent";
  headers: HttpHeaders;

  //queryFormat.queryInput.text.text="";
  text: Text;
  queryInput: QueryInput;
  format: Format;

  constructor(private http: HttpClient) {}

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
        "Bearer ya29.c.Kl6bB1C76rZZXwYp2XSbiRQBW4W6siJbKznGMbEoITs0ao4LEnYrgGq0K0H9ru-rWn02OliBF2wk5AcDCsAIyiA_zVJKWUfIOJ40RR5nxm0M-c_wHELL1ScnoN12cWcF"
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
