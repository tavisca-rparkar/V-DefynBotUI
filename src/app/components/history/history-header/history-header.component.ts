import { Component, OnInit, Input } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Clients } from "src/app/clients/clients";
import { StateService } from "src/app/services/state.service";
import { CustomRouteReuseStrategy } from "src/app/models/router-strategy";

@Component({
  selector: "app-history-header",
  templateUrl: "./history-header.component.html",
  styleUrls: ["./history-header.component.css"]
})
export class HistoryHeaderComponent implements OnInit {
  @Input() userFirstName: string;
  @Input() pointBalance: number;

  constructor(
    private meta: Meta,
    private _router: Router,
    private _clients: Clients,
    private _stateService: StateService
  ) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }

  ngOnInit() {}

  logout() {
    localStorage.clear();
    window.open("./launcher","_self");
  }

  backToChat() {
    this._stateService.IsBackButtonClicked = true;
    let routePath = this._clients.getClientId(
      this._stateService.appData.client
    );
    this._router.navigate(["./chatbot/" + routePath]);
  }
}
