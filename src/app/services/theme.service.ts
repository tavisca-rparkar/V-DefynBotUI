import { Injectable } from "@angular/core";
import { Theme } from "../models/theme";
import { americanExpress } from "../clients/americanExpress/theme";
import { defaultTheme } from "../clients/defaultClient/theme";
import { usBank } from "../clients/usBank/theme";
import { StateService } from './state.service';

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  private active: Theme = defaultTheme;
  private availableThemes: Theme[] = [defaultTheme, usBank, americanExpress];

  constructor(private _stateService:StateService) {}

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

  getTheme(themeName: string) {
    switch (themeName) {
      case "US Bank":
        return usBank;
        break;
      case "American Express":
        return americanExpress;
        break;
      default:
        return defaultTheme;
        break;
    }
  }
}
