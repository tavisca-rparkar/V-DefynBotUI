import {
  Routes,
  RouterModule,
  Router,
  RouteReuseStrategy,
  DetachedRouteHandle,
  ActivatedRouteSnapshot
} from "@angular/router";

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    this.handlers[this.getUrl(route)] = handle;
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.handlers[this.getUrl(route)];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
      return null;
    }
    return this.handlers[this.getUrl(route)];
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return this.getUrl(curr) === this.getUrl(future);
  }

  getUrl(route: ActivatedRouteSnapshot): string {
    /** The url we are going to return */
    let next = route;
    let url = "";
    while (next) {
      if (next.url) {
        url = next.url.join("/");
      }
      next = next.firstChild;
    }
    return url;
  }
}
