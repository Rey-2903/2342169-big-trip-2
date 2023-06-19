import { UPDATE } from '../fish/const.js';
import Observable from '../framework/observable.js';

export default class RoutePointModel extends Observable {
  #routePoint = [];
  #api = null;

  constructor (api) {
    super();
    this.#api = api;
  }

  get routePoint () { return this.#routePoint; }

  init = async () => {
    try { this.#routePoint = await this.#api.routePoint; }
    catch (error) { this.#routePoint = []; }
    this._notify(UPDATE.IN);
  };
}

