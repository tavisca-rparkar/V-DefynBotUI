import { Component, OnInit, Input } from "@angular/core";
import { StateService } from "src/app/services/state.service";

@Component({
  selector: "app-ordering-history",
  templateUrl: "./ordering-history.component.html",
  styleUrls: ["./ordering-history.component.css"]
})
export class OrderingHistoryComponent {
  @Input() isDataAvailable: boolean;
  @Input() orderingHistories: any;

  constructor(private _stateService: StateService) {}
}
