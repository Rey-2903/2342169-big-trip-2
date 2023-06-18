import { getRoutePointModel } from '../fish/fish-data';
import Observable from '../framework/observable.js';

export default class RoutePointModel extends Observable {
  #routePoint = null;

  constructor () {
    super();
    this.#routePoint = getRoutePointModel;
  }

  get destinations () { return this.#routePoint; }

  setRoutePoint(update, newRoutePoint) {
    this.#routePoint = newRoutePoint;
    this._notify(update, getRoutePointModel);
  }
}

