import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  response: Response;

  constructor(private http: HttpClient) { }

  private ApiURL =
    "http://3.132.150.120:80/api/restrauntsearch?localityverbose=";

    GetResponse(userInput: string){
      return this.http.get(this.ApiURL+userInput);
    }


}
