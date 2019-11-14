import { Injectable } from "@angular/core";
import { Theme } from "../models/theme";
import { capitalOne } from "../clients/capitalOne/theme";
import { defaultTheme } from "../clients/defaultClient/theme";
import { visa } from "../clients/visa/theme";
import { StateService } from "./state.service";

@Injectable({
  providedIn: "root"
})
export class ThemeService {
  private active: Theme = defaultTheme;
  private availableThemes: Theme[] = [defaultTheme, visa, capitalOne];

  constructor(private _stateService: StateService) {}

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
      case "VISA":
        return visa;
        break;
      case "Capital One":
        return capitalOne;
        break;
      default:
        return defaultTheme;
        break;
    }
  }
}
