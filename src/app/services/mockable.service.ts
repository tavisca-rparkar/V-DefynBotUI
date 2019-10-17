import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MockableService {
  response: Response;

  constructor(private http: HttpClient) { }

  private ApiURL ="https://demo8483055.mockable.io/dialogflowAuthKey";

    GetResponse(){
      return this.http.get(this.ApiURL);
    }


}
