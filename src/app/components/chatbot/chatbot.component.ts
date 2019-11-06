import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-chatbot",
  templateUrl: "./chatbot.component.html",
  styleUrls: ["./chatbot.component.css"]
})
export class ChatbotComponent implements OnInit {
  constructor( public _stateService: StateService,private meta: Meta, private _router:Router) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }

  ngOnInit() {
    if(!this._stateService.isAppDataSet){
      this._router.navigate(['./launcher']);
    }
  }
}
