import EventsView from '../view/list-points-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import RoutePointsPresenter from './route-points-presenter.js';
import { render, RenderPosition } from '../framework/render.js';
import { SORT } from '../fish/const';
import { getNewElement, sortingByTime, sortingByPrice, sortingByDays } from '../utils';

export default class EventsPresenter {
  #eventsList = null;
  #eventsContainer = null;
  #pointsModel = null;
  #points = null;
  #routePoints = null;
  #offers = null;

  #defaultSorting = SORT.DAY;
  #eventPoints = [];
  #startPoint = [];

  #eventsPresenter = new Map();
  #noPointsComponent = new NoPointsView();
  #sorting = new SortView();

  constructor() {
    this.#eventsList = new EventsView();
  }

  init (eventsContainer, pointsModel, routePointsModel, offersModel) {
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#routePoints = routePointsModel.routePoint;
    this.#offers = offersModel.offers;

    const pointsSortedByDefault = [...this.#pointsModel.points].sort(sortingByDays);
    this.#points = pointsSortedByDefault;
    this.#startPoint = pointsSortedByDefault;

    if (this.#points.length === 0) { render(this.#noPointsComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN); }
    else {
      this.#renderingSorting();
      this.#drawingPoints();
    }
  }

  #drawingPoints = () => {
    render(this.#eventsList, this.#eventsContainer);
    for (let i = 0; i < this.#points.length; i++) {
      const routePointPres = new RoutePointsPresenter(this.#eventsList.element, this.#editingPoint, () => {
        this.#eventsPresenter.forEach((presenter) => presenter.zeroingView());
      });
      routePointPres.init(this.#points[i], this.#routePoints, this.#offers);
      this.#eventsPresenter.set(this.#points[i].id, routePointPres);
    }
  };

  #editingPoint = (newPoint) => {
    this.#eventPoints = getNewElement(this.#eventPoints, newPoint);
    this.#startPoint = getNewElement(this.#startPoint, newPoint);
    this.#eventsPresenter.get(newPoint.id).init(newPoint, this.#routePoints, this.#offers);
  };

  #changingSortingType = (sortType) => {
    if (this.#defaultSorting === sortType) { return; }

    switch (sortType) {
      case SORT.PRICE:
        this.#points.sort(sortingByPrice);
        break;
      case SORT.TIME:
        this.#points.sort(sortingByTime);
        break;
      default: this.#points.sort(sortingByDays);
    }
    this.#defaultSorting = sortType;

    this.#resetListEvents();
    this.#drawingPoints();
  };

  #renderingSorting = () => {
    render(this.#sorting, this.#eventsContainer, RenderPosition.AFTERBEGIN);
    this.#sorting.setSortHandler(this.#changingSortingType);
  };

  #resetListEvents = () => {
    this.#eventsPresenter.forEach((presenter) => presenter.destroy());
    this.#eventsPresenter.clear();
  };
}

