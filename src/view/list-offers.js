import { createElement } from '../render.js';

const createListOffersTemplate = (offers) => (
  `<ul class="event__selected-offers">
    ${offers}
  </ul>`
);

export default class ListOffers {
  constructor(offers){
    this.offers = offers;
  }

  getTemplate () {
    return createListOffersTemplate(this.offers);
  }

  getElement() {
    if (!this.element){
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
