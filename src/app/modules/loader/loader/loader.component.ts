import { Component, OnInit } from '@angular/core';
import { ComponentFactoryService } from 'src/app/services/ComponentFactory.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  isDivVisible: boolean = false ; 
  constructor(private _componentFactoryService: ComponentFactoryService) { }

  ngOnInit() {
    this._componentFactoryService.isLoaderShown$.subscribe(
      isShown => {
        this.isDivVisible= isShown;
        console.log("value of loader is  - "+this.isDivVisible);
      }
    );
  }
/*
  StartLoader(){
    this.isDivVisible = true;
    console.log("value of loader is  - "+this.isDivVisible);
  }
  StopLoader(){
    this.isDivVisible = false;
    console.log("value of loader is  - "+this.isDivVisible);
  }*/

}
