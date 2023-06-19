import Observable from '../framework/observable.js';
import { UPDATE } from '../fish/const.js';

export default class ListOffersModel extends Observable {
  #offers = [];
  #api = null;

  constructor (api) {
    super();
    this.#api = api;
  }

  init = async () => {
    try { this.#offers = await this.#api.offers; }
    catch (error) { this.#offers = []; }
    this._notify(UPDATE.INIT);
  };

  get offers () {return this.#offers;}
}

