import { Component, OnInit, Input } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { StateService } from "src/app/services/state.service";

@Component({
  selector: "app-user-history",
  templateUrl: "./booking-history.component.html",
  styleUrls: ["./booking-history.component.css"]
})
export class UserHistoryComponent {
  @Input() isDataAvailable: boolean;
  @Input() bookingHistories: any;
  constructor(private _stateService: StateService) {}
}
