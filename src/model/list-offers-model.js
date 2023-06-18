import { allOffersPoint } from '../fish/list-offers.js';
import Observable from '../framework/observable.js';

export default class ListOffersModel extends Observable {
  #offers = null;

  constructor () {
    super();
    this.#offers = allOffersPoint;
  }

  get offers () { return this.#offers; }

  setOffers(update, newOf) {
    this.#offers = newOf;
    this._notify(update, newOf);
  }
}

