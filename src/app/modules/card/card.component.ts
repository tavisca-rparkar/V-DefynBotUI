import { Component, OnInit, Input } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.css"]
})
export class CardComponent implements OnInit {
  constructor(
    private _componentFactoryService: ComponentFactoryService,
    private _appService: AppService
  ) {}

  @Input() data: string;
  activeSlideIndex = 0;

  ngOnInit() {}

  ngAfterViewInit() {
    this._componentFactoryService.updateScroll();
  }

  proceedForBooking() {
    this._appService.IntentRouter("Proceed Booking", null);
  }

  showRestaurantList() {
    this._appService.IntentRouter("Show Carousel Again", null);
  }
}
