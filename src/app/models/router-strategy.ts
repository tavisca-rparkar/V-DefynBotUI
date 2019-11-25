import {
  Routes,
  RouterModule,
  Router,
  RouteReuseStrategy,
  DetachedRouteHandle,
  ActivatedRouteSnapshot
} from "@angular/router";
import { HistoryComponent } from "../components/history/history.component";
import { ChatbotComponent } from "../components/chatbot/chatbot.component";

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  public handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return !!route.data && !!(route.data as any).shouldDetach;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.handlers[route.routeConfig.path] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.handlers[route.routeConfig.path];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) return null;
    return this.handlers[route.routeConfig.path];
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    if (
      future.component &&
      (<any>future.component).name == "LauncherComponent"
    ) {
      return false;
    }
    return future.routeConfig === curr.routeConfig;
  }
}
