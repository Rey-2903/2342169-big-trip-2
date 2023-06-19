import EventsView from '../view/list-points-view.js';
import NoPointsView from '../view/no-points-view.js';
import SortView from '../view/sort-view.js';
import RoutePointsPresenter from './route-points-presenter.js';
import CreateFormPresenter from './create-form-presenter.js';
import LoadingPointsView from '../view/loading-points-view.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { render, RenderPosition, remove } from '../framework/render.js';
import {
  SORT,
  ACTIONS_POINTS,
  UPDATE,
  FILTERS,
  LIMIT,
} from '../fish/const.js';
import { sortingByTime, sortingByPrice, sortingByDays, filteringEvents } from '../utils';

export default class EventsPresenter {
  #eventsList = null;
  #eventsContainer = null;
  #eventsPresenter = new Map();
  #createFormPresenter = null;
  #pointsModel = null;
  #filtersModel = null;
  #routePointModel = null;
  #listOffersModel = null;
  #noPointsComponent = null;
  #sorting = null;
  #defaultSort = SORT.DAY;
  #defaultFilter = FILTERS.EVERYTHING;
  #uiBlocker = new UiBlocker(LIMIT.LOWER_LIMIT, LIMIT.UPPER_LIMIT);
  #loading = new LoadingPointsView();
  #isLoading = true;

  constructor(eventsContainer, pointsModel, listOffersModel, routePointModel, filtersModel) {
    this.#eventsList = new EventsView();
    this.#eventsContainer = eventsContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#routePointModel = routePointModel;
    this.#listOffersModel = listOffersModel;
    this.#pointsModel.addObserver(this.#handleEvent);
    this.#filtersModel.addObserver(this.#handleEvent);
    this.#routePointModel.addObserver(this.#handleEvent);
    this.#listOffersModel.addObserver(this.#handleEvent);
  }

  init () { this.#drawingEvents(); }

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

  get destinations() { return this.#routePointModel.destinations; }
  get offers () { return this.#listOffersModel.offers; }

  #drawingPoint (point) {
    const pointPresenter = new RoutePointsPresenter(this.#eventsList.element, this.#handleActions, this.#handleChange);
    pointPresenter.init(point, this.destinations, this.offers);
    this.#eventsPresenter.set(point.id, pointPresenter);
  }

  #sortEvents = (sortType) => {
    switch (sortType){
      case SORT.PRICE:
        this.#pointsModel.points.sort(sortingByPrice);
        break;
      case SORT.TIME:
        this.#pointsModel.points.sort(sortingByTime);
        break;
      default: this.#pointsModel.points.sort(sortingByDays);
    }
    this.#defaultSort = sortType;
  };

  #clearEvents = ({resetSortType = false} = {}) => {
    this.#createFormPresenter.destroy();
    this.#eventsPresenter.forEach((presenter) => presenter.destroy());
    this.#eventsPresenter.clear();
    remove(this.#sorting);
    remove(this.#loading);
    if (this.#noPointsComponent) { remove(this.#noPointsComponent); }
    if (resetSortType) { this.#defaultSort = SORT.DAY; }
  };

  #handleActions = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case ACTIONS_POINTS.UPDATE_POINT:
        this.#eventsPresenter.get(update.id).setSaving();
        try { await this.#pointsModel.updatePoint(updateType, update); }
        catch (error) { this.#eventsPresenter.get(update.id).setAborting(); }
        break;
      case ACTIONS_POINTS.ADD_POINT:
        this.#createFormPresenter.setSaving();
        try { await this.#pointsModel.addPoint(updateType, update); }
        catch (error) { this.#createFormPresenter.setAborting(); }
        break;
      case ACTIONS_POINTS.DELETE_POINT:
        this.#eventsPresenter.get(update.id).setDeleting();
        try { await this.#pointsModel.deletePoint(updateType, update); }
        catch (error) { this.#eventsPresenter.get(update.id).setAborting(); }
        break;
    }
    this.#uiBlocker.unblock();
  };

  #handleEvent = (updateType, data) => {
    switch (updateType) {
      case UPDATE.PATCH:
        this.#eventsPresenter.get(data.id).init(data, this.destinations, this.offers);
        break;
      case UPDATE.MINOR:
        this.#clearEvents();
        this.#drawingEvents();
        break;
      case UPDATE.MAJOR:
        this.#clearEvents({resetSortType: true});
        this.#drawingEvents();
        break;
      case UPDATE.INIT:
        this.#isLoading = false;
        remove(this.#loading);
        if (this.#noPointsComponent) { remove(this.#noPointsComponent); }
        this.#createFormPresenter = new CreateFormPresenter(this.#eventsList.element, this.#handleActions, this.#routePointModel.destinations, this.#listOffersModel.offers);
        this.#drawingEvents();
        break;
    }
  };

  #handleChangeSort = (sortType) => {
    if (this.#defaultSort === sortType) { return; }
    this.#sortEvents(sortType);
    this.#clearEvents();
    this.#drawingEvents();
  };

  #handleChange = () => {
    this.#createFormPresenter.destroy();
    this.#eventsPresenter.forEach((presenter) => presenter.resetView());
  };

  #drawingEvents = () => {
    render(this.#eventsList, this.#eventsContainer);
    if (this.#isLoading) {
      render(this.#loading, this.#eventsContainer, RenderPosition.AFTERBEGIN);
      return;
    }
    const points = this.points;
    const leng = points.length;
    if (leng === 0) {
      this.#drawingNoPoints();
      return;
    }
    this.#drawingSort();
    for (let i = 0; i < this.points.length; i++) { this.#drawingPoint(this.points[i]); }
  };

  #drawingSort = () => {
    this.#sorting = new SortView(this.#defaultSort);
    this.#sorting.setChangeSort(this.#handleChangeSort);
    render(this.#sorting, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  };

  #drawingNoPoints = () => {
    this.#noPointsComponent = new NoPointsView({ filterType: this.#defaultFilter, });
    render(this.#noPointsComponent, this.#eventsContainer, RenderPosition.AFTERBEGIN);
  };
}

