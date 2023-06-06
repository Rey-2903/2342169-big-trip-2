import ListEventsView from '../view/list-events-view';
import CardPointsView from '../view/card-points-view';
import CreateFormView from '../view/create-form-view';
import EditFormView from '../view/edit-form-view';
import SortView from '../view/sort-view';
import { render } from '../render.js';

export default class EventsPresenter {
  constructor() {
    this.eventsList = new ListEventsView();
  }

  init (tripContainer, pointsModel, editingFormModel, destinationsModel) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
    this.points = [...this.pointsModel.getPoints()];
    this.destinations = destinationsModel.getDestinations();

    render(new SortView(), this.tripContainer);
    render(this.eventsList, this.tripContainer);
    render(new EditFormView(editingFormModel.getForm(), this.destinations),
      this.eventsList.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new CardPointsView(this.points[i], this.destinations), this.eventsList.getElement());
    }

    render(new CreateFormView(this.destinations), this.eventsList.getElement());
  }
}
