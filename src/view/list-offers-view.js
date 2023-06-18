import AbstractView from '../framework/view/abstract-view.js';

const createListOffersTemplate = (offers) => (
  `<ul class="event__selected-offers">${offers}</ul>`
);

export default class ListOffersView extends AbstractView {
  #offers = null;

  constructor(offers){
    super();
    this.#offers = offers;
  }

  get template () { return createListOffersTemplate(this.#offers); }
}

