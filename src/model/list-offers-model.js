import { getOffersByAllTypes } from '../fish/list-offers';

export default class ListOffersModel {
  #offers = null;

  constructor () {
    this.#offers = getOffersByAllTypes();
  }

  get offers () {return this.#offers;}
}
