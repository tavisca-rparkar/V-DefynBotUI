import { Component, OnInit, Input } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { StateService } from "src/app/services/state.service";
import { AppService } from "src/app/services/app.service";
import { MenuItem } from "src/app/models/cart";

@Component({
  selector: "app-orderingsummarycard",
  templateUrl: "./orderingsummarycard.component.html",
  styleUrls: ["./orderingsummarycard.component.css"]
})
export class OrderingsummarycardComponent implements OnInit {
  @Input() data: string;
  isErrorDetected: boolean = false;
  status: string = "";
  pointBalance: number;

  constructor(
    private _componentFactoryService: ComponentFactoryService,
    public _stateService: StateService,
    private _appService: AppService
  ) {}

  ngOnInit() {

    if (this.data["status"] == "Order Successful") {
      this.isErrorDetected = false;
      this.status = "ordered";
    } else {
      this.isErrorDetected = true;
      this.status = "cancelled";
    }
    this.pointBalance = this._stateService.appData.pointBalance;
  }

  ngAfterViewInit(): void {
    this._componentFactoryService.updateScroll();
  }
}
