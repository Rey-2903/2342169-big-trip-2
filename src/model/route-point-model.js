import Observable from '../framework/observable.js';
import { UPDATE } from '../fish/const.js';

export default class RoutePointModel extends Observable {
  #routePoint = [];
  #api = null;

  constructor (api) {
    super();
    this.#api = api;
  }

  get destinations () {return this.#routePoint;}

  init = async () => {
    try { this.#routePoint = await this.#api.destinations; }
    catch (error) { this.#routePoint = []; }
    this._notify(UPDATE.INIT);
  };
}

