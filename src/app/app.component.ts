import { Component, OnInit } from "@angular/core";
import { ComponentFactoryService } from './services/ComponentFactory.service';
import { StateService } from './services/state.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private _componentFactoryService: ComponentFactoryService,
    private _stateService: StateService){
  }
  ngOnInit(){    
  }
  
  title = "ConciergeBookingApp";
}
