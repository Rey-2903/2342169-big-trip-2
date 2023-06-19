import AbstractView from '../framework/view/abstract-view.js';

const creatingLoading = () => (
  '<p class="trip-events__msg">Loading...</p>'
);

export default class LoadingPointsView extends AbstractView {
  get template() { return creatingLoading(); }
}
