import { Injectable } from "@angular/core";
import { Theme } from "../models/theme";
import { defaultClient } from "../clients/defaultClient/theme";
import { StateService } from "./state.service";
import { Clients } from '../clients/clients';

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  private active: Theme = defaultClient;

  constructor(private _stateService: StateService,
    private _clients:Clients) {}

  setActiveTheme(theme: Theme): void {
    this.active = theme;
    this._stateService.clientLogo = this.active.style["icon"];

    Object.keys(this.active.style).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.style[property]
      );
    });
  }

  getTheme(themeName: string):Theme {
   return this._clients.getClientTheme(themeName);
  }
}
