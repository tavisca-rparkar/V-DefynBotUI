import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateService } from './state.service';
import { timeout } from 'rxjs/internal/operators/timeout';

@Injectable({
  providedIn: 'root'
})
export class UserHistoryService {
  BookingHistoryApiUrl = "";
  OrderingHistoryApiUrl = "";
  constructor(
    private _http: HttpClient,
    private _stateService:StateService
    ) { }

  SetUrl(url:string){
    this.BookingHistoryApiUrl = url+"BookingHistory?";
    this.OrderingHistoryApiUrl = url+"OrderingHistory?";
  }

  GetBookingResponse(){
  let response= this._http.get(this.BookingHistoryApiUrl+
    "userId="+this._stateService.appData.userId+
    "&corelationId"+this._stateService.appData.sessionId)
  .pipe(timeout(10000));
  return response;
  }

  GetOrderingResponse(){
  let response= this._http.get(this.OrderingHistoryApiUrl+
    "userId="+this._stateService.appData.userId+
    "&corelationId"+this._stateService.appData.sessionId)
  .pipe(timeout(10000));
  return response;
  }

}