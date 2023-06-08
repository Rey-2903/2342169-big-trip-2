import { createElement } from '../render.js';

const creatingListEventsTemplate = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class ListEventsView {
  #element = null;

  get template () {
    return creatingListEventsTemplate();
  }

  get element() {
    if (!this.#element){
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
