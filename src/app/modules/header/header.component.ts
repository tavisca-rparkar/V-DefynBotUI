import { Component, OnInit, Input } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @Input() bankName:string;
  @Input() userFirstName:string;
  @Input() pointBalance:number;


  constructor( private meta: Meta,
    private _router:Router) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }
  ngOnInit() {}

  logout(){
    localStorage.clear();
    this._router.navigate(['./launcher']);
  }
  
}
