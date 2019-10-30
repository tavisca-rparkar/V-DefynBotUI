import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class DialogflowApiService {
  private _productUrl =
    "https://dialogflow.googleapis.com/v2/projects/v-defynbot-rkixcd/agent/sessions/1235:detectIntent";
  private _headers: HttpHeaders;

  private _authKey =
    "Bearer ya29.c.Kl6iB4sTWHKn1NMZqfODVP2VTaAdsIuxQ7JoHMuwS6I-6Or4xsy5a6NWQQVwZu9p3_4M_qW_1aBa_xHa7_8dMrqaC8b3T38zN-eKXquppNSpcb8xfoop0z1ncb4zcR8h";

  //queryFormat.queryInput.text.text="";
  text: Text;
  queryInput: QueryInput;
  format: Format;

  constructor(private _http: HttpClient) {}

  SetKey(key: string) {
    this._authKey = "Bearer " + key;
  }

  GetResponseMock(request: String) {
    let response = {
      intent: "Mock",
      message: "Hello User, This is a mock response from a mock server!"
    };
    return response;
  }

  GetResponse(userInput: string): Observable<JSON> {
    this._headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: this._authKey
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

    var sample = this._http.post<JSON>(
      this._productUrl,
      JSON.stringify(this.format),
      { headers: this._headers, responseType: "json" }
    );
    return sample;
  }
}


export class Format {
  queryInput: QueryInput;
}

export class Text {
  languageCode: string;
  text: string;
}

export class QueryInput {
  text: Text;
}