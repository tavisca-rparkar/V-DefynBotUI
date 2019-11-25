import { NgModule, Component } from "@angular/core";
import {
  Routes,
  RouterModule,
  Router,
  RouteReuseStrategy,
  DetachedRouteHandle,
  ActivatedRouteSnapshot
} from "@angular/router";
import { ChatbotComponent } from "./components/chatbot/chatbot.component";
import { LauncherComponent } from "./components/launcher/launcher.component";
import { Clients } from "./clients/clients";
import { HistoryComponent } from "./components/history/history.component";
import { UserHistoryComponent } from "./modules/booking-history/booking-history.component";
import { OrderingHistoryComponent } from "./modules/ordering-history/ordering-history.component";

const appRoutes: Routes = [
  { path: "launcher", component: LauncherComponent },
  {
    path: "chatbot",
    component: ChatbotComponent,
    data: { shouldDetach: true }
  },
  { path: "history", component: HistoryComponent },
  { path: "", redirectTo: "launcher", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private _clients: Clients, private _router: Router) {
    this.resetRouteConfig();
  }

  resetRouteConfig() {
    this._clients.getAvailableThemes().forEach(element => {
      this._router.config.push({
        path: "chatbot/" + element.id,
        component: ChatbotComponent,
        data: { shouldDetach: true }
      });
    });
    // setting fallback route after configuring all client routes
    this._router.config.push({
      path: "**",
      redirectTo: "launcher",
      pathMatch: "full"
    });
  }
}
