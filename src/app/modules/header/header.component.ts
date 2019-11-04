import { Component, OnInit } from "@angular/core";
import { StateService } from "src/app/services/state.service";
import { Meta } from "@angular/platform-browser";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private _stateService: StateService, private meta: Meta) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }

  ngOnInit() {}
}
