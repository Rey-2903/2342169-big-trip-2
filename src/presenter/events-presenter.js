import ListEventsView from '../view/list-events-view';
import NoPointsView from '../view/no-points-view';
import SortView from '../view/sort-view';
import RoutePointsPresenter from './route-points-presenter';
import { render, RenderPosition } from '../framework/render.js';

export default class TripEventsPresenter {
  #eventsList = null;
  #tripContainer = null;
  #pointsModel = null;
  #points = null;
  #destinations = null;
  #tripEvents = [];
  #eventsPresenter = new Map();
  #noPointsComp = new NoPointsView();
  #sortComp = new SortView();

  constructor() {
    this.#eventsList = new ListEventsView();
  }

  init (tripContainer, pointsModel, destinationsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#points = [...this.#pointsModel.points];
    this.#destinations = destinationsModel.destinations;

    if(this.#points.length === 0){
      this.#getNoPoints();
    }

    else {
      this.#getSort();
      this.#drawingPoints();
    }
  }

  #drawingPoint (point) {
    const pointPresenter = new RoutePointsPresenter(this.#eventsList.element, this.#changingPoint, this.#changingPointsModes);
    pointPresenter.init(point, this.#destinations);

    this.#eventsPresenter.set(point.id, pointPresenter);
  }

  #drawingPoints = () => {
    this.#getListPoints();
    for (let i = 0; i < this.#points.length; i++) {
      this.#drawingPoint(this.#points[i]);
    }
  };

  #changingPointsModes = () => {
    this.#eventsPresenter.forEach((presenter) => presenter.resetView());
  };

  #changingPoint = (upPoint) => {
    this.#tripEvents = () => {
      const index = this.#tripEvents.findIndex((item) => item.id === upPoint.id);
      if (index === -1) {
        return this.#tripEvents;
      }
      return [
        ...this.#tripEvents.slice(0, index),
        upPoint,
        ...this.#tripEvents.slice(index + 1),
      ];
    };
    this.#eventsPresenter.get(upPoint.id).init(upPoint, this.#destinations);
  };

  #getSort = () => {
    render(this.#sortComp, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #getNoPoints = () => {
    render(this.#noPointsComp, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #getListPoints = () => {
    render(this.#eventsList, this.#tripContainer);
  };
}
