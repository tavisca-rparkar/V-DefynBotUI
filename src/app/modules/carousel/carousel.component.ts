import { Component, Input, AfterViewInit, OnInit } from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"]
})
export class CarouselComponent implements AfterViewInit,OnInit {
  @Input() mainData: string;
  data:any;
  carouselType:string;

  constructor(
    private _componentFactoryService: ComponentFactoryService,
    private _appService: AppService
  ) {}
  ngOnInit(){
  this.data = this.mainData["data"];
  this.carouselType = this.mainData["carouselType"];
  }
  ngAfterViewInit() {
    this._componentFactoryService.updateScroll();
  }

  showDetails(index: number) {
    const request = [
      this.data[index]["restaurantId"],
      this.data[index]["supplierName"]
    ];
    if(this.carouselType=="Restaurant Booking"){
      this._appService.IntentRouter("Show Details", request);
    }else{
      this._appService.IntentRouter("Show Menu", request);
    }
    
  }
}
