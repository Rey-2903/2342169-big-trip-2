import {createElement} from '../render';

const createNewEventTemplate = () => (
  '<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button" disabled>New event</button>'
);

export default class EventAddBtn {
  getTemplate() {
    return createNewEventTemplate();
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
