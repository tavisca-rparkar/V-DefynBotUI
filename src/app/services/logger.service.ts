import { Injectable } from '@angular/core';
import { ApiCallType } from '../models/ApiCallType';
import { ApiCallMethod } from '../models/ApiCallMethod';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  logApiCall(userSessionId:string,
    clientId:string,
    timestamp:string,
    ApiCallUrl:string,
    callMethod:ApiCallMethod,
    callData:any,
    callType:ApiCallType){
      //logic for logger
  }


  logError(userSessionId:string,
    clientId:string,
    timestamp:string,
    ErrorMessage:string,
    ErrorData:any){
      //logic for logger
  }



}
