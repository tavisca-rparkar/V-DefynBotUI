import { Component, OnInit, Input } from '@angular/core';
import { ComponentFactoryService } from 'src/app/services/ComponentFactory.service';
import { StateService } from 'src/app/services/state.service';
import { AppService } from 'src/app/services/app.service';
import { MenuItem } from 'src/app/models/cart';

@Component({
  selector: 'app-orderingsummarycard',
  templateUrl: './orderingsummarycard.component.html',
  styleUrls: ['./orderingsummarycard.component.css']
})
export class OrderingsummarycardComponent implements OnInit {

  @Input() data: string;
  isErrorDetected: boolean = false;
  status:string = "";
  pointBalance:number;
  /*data = {
    status: "Order Successful",
    error: null,
    totalPointPrice: 300,
    menu:[],
    orderingId:1,
    totalPoints:12000,
    date: "2019-11-11T00:00:00",
    time: "11:59:59",
    restaurantId: "zomato/1",
    userName: "swar",
    restaurantName: "Novotel",
    perPersonPoints: 100,
    pointBalance: 1000
  };
*/
  constructor(private _componentFactoryService: ComponentFactoryService,
    private _stateService : StateService,
    private _appService : AppService) {}

  ngOnInit() {
    console.log("ordering summary card build successfull !");
    /*this.menu=new Array<MenuItem>();
    this.menu.push({"name":"ice cream","price":100,"quantity":1});
    this.menu.push({"name":"chicken Biryani","price":1000,"quantity":10});
    this.menu.push({"name":"mutton Biryani","price":10000,"quantity":10});
    console.log(this.menu);
    this.data["menu"]=this.menu;*/
    if (this.data["status"] == "Order Successful") {
      this.isErrorDetected = false;
      this.status = "ordered";
    } else {
      this.isErrorDetected = true;
      this.status = "cancelled";
    }
    this.pointBalance= this._stateService.appData.pointBalance;
  }

  ngAfterViewInit(): void {
    this._componentFactoryService.updateScroll();
  }

  


}
