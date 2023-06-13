import { getRoutePointModel } from '../fish/fish-data';

export default class RoutePointModel {
  #destinations = null;

  constructor () {
    this.#destinations = getRoutePointModel();
  }

  get routePoint () {
    return this.#destinations;
  }
}
