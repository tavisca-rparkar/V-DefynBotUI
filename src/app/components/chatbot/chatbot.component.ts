import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { StateService } from 'src/app/services/state.service';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: "app-chatbot",
  templateUrl: "./chatbot.component.html",
  styleUrls: ["./chatbot.component.css"]
})
export class ChatbotComponent implements OnInit {
  constructor( public _stateService: StateService,
    private meta: Meta, 
    private _router:Router,
    private _themingService: ThemeService) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }

  ngOnInit() {
    if(localStorage.getItem("isLoggedIn")!="true"){
      this._router.navigate(['./launcher']);
    }else{
      
      this._stateService.getSessionData();
      this._themingService.setActiveTheme(
        this._themingService.getTheme(this._stateService.appData.client)
      ); 
      if(this._router.url !== '/chatbot/'+this._stateService.appData.client){
        alert("You are not authenticated to view the requested page.");
        this._router.navigate(['./launcher']);
      }
    }
  }
}
