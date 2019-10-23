import { Component, Input } from '@angular/core';
import { ComponentFactoryService } from 'src/app/services/ComponentFactory.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() data: string;

  activeSlideIndex = 0;
 
  constructor(private _componentFactoryService: ComponentFactoryService,
    private _appService: AppService ) {
  }
  ngAfterViewInit() {
    this._componentFactoryService.updateScroll();
  }

  showDetails(index:number){
    const request = [this.data[index]["restarauntId"],
                      this.data[index]["supplierName"]];
    this._appService.IntentRouter("Show Details", request);
}



}