import { Component, OnInit, Input } from "@angular/core";
import { Meta } from "@angular/platform-browser";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Input() bankName:string;
  @Input() userFirstName:string;
  @Input() pointBalance:number;


  constructor( private meta: Meta) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }
  ngOnInit() {}
}
