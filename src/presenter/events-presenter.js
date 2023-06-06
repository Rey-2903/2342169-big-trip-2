import EventsView from '../view/list-events-view.js';
import CardPointsView from '../view/card-points-view.js';
import CreateFormView from '../view/create-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class EventsPresenter {
  constructor() {
    this.eventsList = new EventsView();
  }

  init (tripContainer) {
    this.tripContainer = tripContainer;

    render(new SortView(), this.tripContainer);
    render(this.eventsList, this.tripContainer);
    render(new EditFormView(), this.eventsList.getElement());

    for (let i = 0; i < 3; i++){
      render(new CardPointsView(), this.eventsList.getElement());
    }

    render(new CreateFormView(), this.eventsList.getElement());
  }
}
