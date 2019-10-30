import { Component, Input, OnInit, AfterViewInit } from "@angular/core";
import { ComponentFactoryService } from 'src/app/services/ComponentFactory.service';

@Component({
  selector: "app-text-bubble",
  templateUrl: "./text-bubble.component.html",
  styleUrls: ["./text-bubble.component.css"]
})
export class TextBubbleComponent implements AfterViewInit {
  @Input() text: string;
  @Input() textType: string;

  constructor(private _componentFactoryService : ComponentFactoryService) {}

  ngAfterViewInit() {
    this._componentFactoryService.updateScroll();
  }
}
