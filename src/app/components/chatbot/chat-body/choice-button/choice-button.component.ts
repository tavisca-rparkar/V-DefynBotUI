import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ComponentFactoryService } from 'src/app/services/ComponentFactory.service';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-choice-button',
  templateUrl: './choice-button.component.html',
  styleUrls: ['./choice-button.component.css']
})
export class ChoiceButtonComponent implements AfterViewInit {
  @Input() buttonText: string;

  constructor(private _appService: AppService,
    private _componentFactoryService : ComponentFactoryService ) { }

  ngAfterViewInit() {
    this._componentFactoryService.updateScroll();
  }
  
  SendUserInput(){
    this._appService.ProcessInput(this.buttonText);
  }
}
