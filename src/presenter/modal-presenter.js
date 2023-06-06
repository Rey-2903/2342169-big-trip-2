import EditEventView from '../view/edit-event-view';
import TripEventList from '../view/trip-event-list';
import SortView from '../view/sort-view.js';
import ViewingPointView from '../view/viewing-point-view';
import { render } from '../render.js';

export default class ModelPresenter {
  constructor(modelContainer) {
    this.boardComponent = new TripEventList();
    this.modelContainer = modelContainer;
  }

  init(pointsModel) {
    this.pointsModel = pointsModel;
    this.modalPoints = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];

    render(new SortView(), this.modelContainer);
    render(this.boardComponent, this.modelContainer);
    render(new EditEventView(this.modalPoints[0], this.destinations, this.offers), this.boardComponent.getElement());

    for (const point of this.modalPoints){
      render(new ViewingPointView(point, this.destinations, this.offers), this.boardComponent.getElement());
    }
  }
}
