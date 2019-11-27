import { visa } from "./visa/theme";
import { defaultClient } from "./defaultClient/theme";
import { capitalOne } from "./capitalOne/theme";
import { Theme } from "../models/theme";
import { Router } from "@angular/router";

export class Clients {
  constructor() {}

  private availableThemes: Theme[] = [defaultClient, visa, capitalOne];

  getClientTheme(clientName: string): Theme {
    let isClientFound = false;
    let client;
    this.availableThemes.forEach(element => {
      if (element.name === clientName) {
        isClientFound = true;
        client = element;
      }
    });
    if (isClientFound) {
      return client;
    } else {
      return defaultClient;
    }
  }

  getClientNameList(): string[] {
    let clientNames = new Array<string>();
    this.availableThemes.forEach(client => {
      clientNames.push(client.name);
    });
    return clientNames;
  }

  getClientIdList(): string[] {
    let clientIds = new Array<string>();
    this.availableThemes.forEach(client => {
      clientIds.push(client.id);
    });
    return clientIds;
  }

  getClientId(clientName: string): string {
    let reqId = "";
    this.availableThemes.forEach(client => {
      if (client.name == clientName) {
        reqId = client.id;
      }
    });
    return reqId;
  }

  getAvailableThemes() {
    return this.availableThemes;
  }
}
