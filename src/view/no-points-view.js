import AbstractView from '../framework/view/abstract-view.js';
import { NO_POINTS_TEXT} from '../fish/const.js';

const createNoEventsTemplate = (filterType) => (
  `<p class="trip-events__msg">${NO_POINTS_TEXT[filterType]}</p>`);

export default class NoPointsView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template () { return createNoEventsTemplate(this.#filterType); }
}
