import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  response: Response;

  constructor(private http: HttpClient) { }

  private ApiURL =
    "http://172.16.5.195:5000/api/restrauntsearch?localityverbose=";

    SetURL(url:string){
      this.ApiURL = url;
    }
    GetResponse(userInput: string){
      return this.http.get(this.ApiURL+userInput).pipe(timeout(4000));
    }
}
