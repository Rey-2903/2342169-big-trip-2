import AbstractView from '../framework/view/abstract-view';

const creatingListEventsTemplate = () => (
  '<ul class="trip-events__list"></ul>'
);

export default class ListEventsView extends AbstractView {
  get template () {
    return creatingListEventsTemplate();
  }
}
