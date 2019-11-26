import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked
} from "@angular/core";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"]
})
export class LoaderComponent implements OnInit, AfterViewChecked {
  isDivVisible: boolean = false;
  isListening: boolean = false;
  constructor(private _componentFactoryService: ComponentFactoryService) {}

  ngOnInit() {
    this._componentFactoryService.isLoaderShown$.subscribe(isShown => {
      this.isDivVisible = isShown;
    });
    this._componentFactoryService.isListening$.subscribe(isListening => {
      this.isListening = isListening;
    });
  }

  ngAfterViewChecked(): void {
    this._componentFactoryService.updateScroll();
  }
}
