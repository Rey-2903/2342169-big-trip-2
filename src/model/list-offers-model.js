import { UPDATE } from '../fish/const.js';
import Observable from '../framework/observable.js';

export default class ListOffersModel extends Observable {
  #offers = [];
  #api = null;

  constructor (api) {
    super();
    this.#api = api;
  }

  get offers () { return this.#offers; }

  init = async () => {
    try { this.#offers = await this.#api.offers; }
    catch (error) { this.#offers = []; }
    this._notify(UPDATE.IN);
  };
}

