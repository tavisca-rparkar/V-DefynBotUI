import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ComponentFactoryService } from 'src/app/services/ComponentFactory.service';
import { AppService } from 'src/app/services/app.service';
import {LocationAccessService} from 'src/app/services/locationAccess.service'
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'location-button',
  templateUrl: './location-button.component.html',
  styleUrls: ['./location-button.component.css']
})
export class LocationButtonComponent implements AfterViewInit {
  @Input() buttonText: string;

  constructor(
    private _appService: AppService,
    private _locationAccessService:LocationAccessService,
    private _componentFactoryService : ComponentFactoryService,
    private _stateService:StateService ) { }

  ngAfterViewInit() {
    this._componentFactoryService.updateScroll();
  }
  
  SendUserInput(){
    window.location.reload();
  }
}

