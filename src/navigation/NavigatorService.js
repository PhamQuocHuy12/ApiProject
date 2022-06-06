export default class NavigationService {
  static ref;
  static screen;

  static setRef(navigationRef) {
    this.ref = navigationRef;
  }

  static getRef() {
    return this.ref;
  }

  static getCurrentRouteName() {
    return this.ref.current && this.ref.current?.getCurrentRoute().name;
  }

  static setInitRoute(screen) {
    this.screen = screen;
  }

  static getInitRoute() {
    return this.screen;
  }
}
