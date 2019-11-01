import { Component, OnInit } from "@angular/core";
import { MockableApiService } from "./services/mockableApi.service";

import { from } from 'rxjs';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    
  }
  title = "ConciergeBookingApp";
  
}
