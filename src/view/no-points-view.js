import AbstractView from '../framework/view/abstract-view.js';
import { FILTERS } from '../fish/const.js';

const NO_POINTS_TEXT = {
  [FILTERS.EVERYTHING]: 'Click New Event to create your first point',
  [FILTERS.FUTURE]: 'There are no future points now',
  [FILTERS.PAST]: 'There are no past points today',
};

const createNoEventsTemplate = (type) => (
  `<p class="trip-events__msg">${NO_POINTS_TEXT[type]}</p>`
);

export default class NoPointsView extends AbstractView {
  #filterType = null;

  constructor({type}) {
    super();
    this.#filterType = type;
  }

  get template () { return createNoEventsTemplate(this.#filterType); }
}
