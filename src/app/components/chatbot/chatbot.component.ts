import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { StateService } from "src/app/services/state.service";
import { Router, NavigationEnd } from "@angular/router";
import { ThemeService } from "src/app/services/theme.service";
import { Clients } from "src/app/clients/clients";
import { ComponentFactoryService } from 'src/app/services/ComponentFactory.service';

@Component({
  selector: "app-chatbot",
  templateUrl: "./chatbot.component.html",
  styleUrls: ["./chatbot.component.css"]
})
export class ChatbotComponent implements OnInit {
  constructor(
    public _stateService: StateService,
    private meta: Meta,
    private _router: Router,
    private _themingService: ThemeService,
    private _clients: Clients,
    private _componentFactoryService: ComponentFactoryService
  ) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
    this._router.events.subscribe((ev)=>{
      if(ev instanceof NavigationEnd){
        if(this._stateService.IsBackButtonClicked == true){
          this._componentFactoryService.updateScroll();
          this._stateService.IsBackButtonClicked = false;
        }
      }
    })
  }

  ngOnInit() {
    if (localStorage.getItem("isLoggedIn") != "true") {
      window.open("./launcher","_self");
    } else {
      this._stateService.getSessionData();
      this._themingService.setActiveTheme(
        this._themingService.getTheme(this._stateService.appData.client)
      );
      let routePath = this._clients.getClientId(
        this._stateService.appData.client
      );
      if (this._router.url !== "/chatbot/" + routePath) {
        alert(
          this._router.url +
            " --- " +
            "/chatbot/" +
            this._stateService.appData.client
        );
        window.open("./launcher","_self");
      }
    }
  }
}
