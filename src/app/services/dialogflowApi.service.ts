import { Injectable } from "@angular/core";
import {
  HttpClient,
} from "@angular/common/http";
import { StateService } from './state.service';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})

export class DialogflowApiService {
  private _dialogflowApi = "http://172.16.5.153/api/dialougflow";
  private _authKey =
    "Bearer ya29.c.Kl6iB4sTWHKn1NMZqfODVP2VTaAdsIuxQ7JoHMuwS6I-6Or4xsy5a6NWQQVwZu9p3_4M_qW_1aBa_xHa7_8dMrqaC8b3T38zN-eKXquppNSpcb8xfoop0z1ncb4zcR8h";

  constructor(private _http: HttpClient,
    private _stateService: StateService) {}

  SetKey(key: string) {
    this._authKey = key;
  }

  SetUrl(url:string){
    this._dialogflowApi = url+"dialougflow";
  }

  GetResponse(userInput: string){
    return this._http.post(this._dialogflowApi,{
      "userId":this._stateService.appData.userId,
      "key": this._authKey,
      "text":userInput,
      "languageCode":"en"
  }).pipe(timeout(10000));
  }
}