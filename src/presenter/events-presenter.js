import EventsView from '../view/list-points-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import RoutePointsPresenter from './route-points-presenter.js';
import CreateFormPresenter from './create-form-presenter.js';
import LoadingPointsView from '../view/loading-points-view.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import { SORT, ACTIONS_POINTS, UPDATE, FILTERS } from '../fish/const.js';
import { sortingByTime, sortingByPrice, sortingByDays } from '../utils';
import { filteringEvents } from '../utils';

export default class EventsPresenter {
  #eventsList = null;
  #eventsContainer = null;
  #createFormPresenter = null;
  #pointsModel = null;
  #filtersModel = null;
  #routePointModel = null;
  #listOffersModel = null;
  #noPointsComponent = null;
  #sorting = null;
  #eventsPresenter = new Map();
  #defaultSort = SORT.DAY;
  #defaultFilter = FILTERS.EVERYTHING;
  #isLoading = true;
  #loading = new LoadingPointsView();

  constructor(eventsContainer, pointsModel, listOffersModel, routePointModel, filtersModel) {
    this.#eventsList = new EventsView();
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#routePointModel = routePointModel;
    this.#listOffersModel = listOffersModel;
    this.#createFormPresenter = new CreateFormPresenter(this.#eventsList.element, this.#handleViewAction, this.#routePointModel.routePoint, this.#listOffersModel.offers);
    this.#pointsModel.addObserver(this.#handlePoint);
    this.#filtersModel.addObserver(this.#handlePoint);
    this.#routePointModel.addObserver(this.#handlePoint);
    this.#listOffersModel.addObserver(this.#handlePoint);
  }

  init () { this.#darwingEvents(); }

  createNewForm (callback) {
    this.#defaultSort = SORT.DAY;
    this.#filtersModel.setFilter(UPDATE.MAJOR, FILTERS.EVERYTHING);
    this.#createFormPresenter.init(callback);
  }

  get points() {
    this.#defaultFilter = this.#filtersModel.filter;
    const filters = filteringEvents[this.#defaultFilter](this.#pointsModel.points);
    switch (this.#defaultSort) {
      case SORT.PRICE: return filters.sort(sortingByPrice);
      case SORT.TIME: return filters.sort(sortingByTime);
      default: return filters.sort(sortingByDays);
    }
  }

  get destinations() { return this.#routePointModel.routePoint; }
  get offers () { return this.#listOffersModel.offers; }

  #clearEvents = ({resetSorting = false} = {}) => {
    this.#createFormPresenter.destroy();
    this.#eventsPresenter.forEach((presenter) => presenter.destroy());
    this.#eventsPresenter.clear();
    remove(this.#sorting);
    remove(this.#loading);
    this.#delEventsNoPoints();
    if (resetSorting) { this.#defaultSort = SORT.DAY; }
  };

  #handleViewAction = (active, update, temp) => {
    switch (active) {
      case ACTIONS_POINTS.ADD:
        this.#pointsModel.addEvent(update, temp);
        break;
      case ACTIONS_POINTS.DELETE:
        this.#pointsModel.deleteEvent(update, temp);
        break;
      case ACTIONS_POINTS.UPDATE:
        this.#pointsModel.updateEvent(update, temp);
        break;
    }
  };

  #handlePoint = (update, data) => {
    switch (update) {
      case UPDATE.MINOR:
        this.#clearEvents();
        this.#darwingEvents();
        break;
      case UPDATE.MAJOR:
        this.#clearEvents({ resetSortType: true });
        this.#darwingEvents();
        break;
      case UPDATE.PATCH:
        this.#eventsPresenter.get(data.id).init(data, this.destinations, this.offers);
        break;
      case UPDATE.IN:
        this.#isLoading = false;
        remove(this.#loading);
        this.#delEventsNoPoints();
        this.#darwingEvents();
        break;
    }
  };

  #darwingEvents = () => {
    render(this.#eventsList, this.#eventsContainer);
    if (this.#isLoading) {
      render(this.#loading, this.#eventsContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    const points = this.points;
    const pointsCount = points.length;
    if (pointsCount === 0) {
      this.#darwingNoPoints();
      return;
    }
    this.#darwingSortPoints();
    for (let i = 0; i < this.points.length; i++) {
      const pointPresenter = new RoutePointsPresenter(this.#eventsList.element, this.#handleViewAction, () => {
        this.#createFormPresenter.destroy();
        this.#eventsPresenter.forEach((presenter) => presenter.zeroingView());
      });
      pointPresenter.init(this.points[i], this.destinations, this.offers);
      this.#eventsPresenter.set(this.points[i].id, pointPresenter);
    }
  };

  #darwingSortPoints = () => {
    this.#sorting = new SortView(this.#defaultSort);
    this.#sorting.setChangeSort((sort) => {
      if (this.#defaultSort === sort) { return; }
      switch (sort) {
        case SORT.PRICE:
          this.#pointsModel.points.sort(sortingByPrice);
          break;
        case SORT.TIME:
          this.#pointsModel.points.sort(sortingByTime);
          break;
        default: this.#pointsModel.points.sort(sortingByDays);
      }
      this.#defaultSort = sort;
      this.#clearEvents();
      this.#darwingEvents();
    });
    render(this.#sorting, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  };

  #delEventsNoPoints = () => { if (this.#noPointsComponent) { remove(this.#noPointsComponent); } };

  #darwingNoPoints = () => {
    this.#noPointsComponent = new NoPointsView({ filterType: this.#defaultFilter, });
    render(this.#noPointsComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  };
}


