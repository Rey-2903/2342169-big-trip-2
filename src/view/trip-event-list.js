import {createElement} from '../render';

const createNewListEventTenplate = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class TripEventList {
  getTemplate() {
    return createNewListEventTenplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

