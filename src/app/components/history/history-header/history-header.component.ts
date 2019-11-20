import { Component, OnInit, Input } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";

@Component({
  selector: "app-history-header",
  templateUrl: "./history-header.component.html",
  styleUrls: ["./history-header.component.css"]
})
export class HistoryHeaderComponent implements OnInit {
  @Input() userFirstName: string;
  @Input() pointBalance: number;

  constructor(private meta: Meta, private _router: Router) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }

  ngOnInit() {}
}
