import ListEventsView from '../view/list-events-view';
import NoPointsView from '../view/no-points-view';
import SortView from '../view/sort-view';
import RoutePointsPresenter from './route-points-presenter';
import {SortTypes} from '../fish/const';
import {getPeriod, getEmptyDate} from '../utils';
import { render, RenderPosition } from '../framework/render.js';
import dayjs from 'dayjs';

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
  #nowTypeSort = SortTypes.PRICE;
  #getedPoints = [];

  constructor() {
    this.#eventsList = new ListEventsView();
  }

  init (tripContainer, pointsModel, destinationsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#destinations = destinationsModel.destinations;

    const defaultSort = [...this.#pointsModel.points].sort((p1, p2) => {
      const weight = getEmptyDate(p1.dateFrom, p2.dateFrom);
      const res = weight ?? dayjs(p1.dateFrom).diff(dayjs(p2.dateFrom));
      return res;
    });
    this.#points = defaultSort;
    this.#getedPoints = defaultSort;

    if (this.#points.length === 0) {
      this.#getNoPoints();
    }
    else {
      this.#getSort();
      this.#drawingPoints();
    }
  }

  #drawingPoints = () => {
    this.#getListPoints();
    for (let i = 0; i < this.#points.length; i++) {
      const pointPresenter = new RoutePointsPresenter(this.#eventsList.element, this.#changingPoint, this.#changingPointsModes);
      pointPresenter.init(this.#points[i], this.#destinations);
      this.#eventsPresenter.set(this.#points[i].id, pointPresenter);
    }
  };

  #sortingPoints = (sortTypes) => {
    switch (sortTypes) {
      case SortTypes.DAY:
        this.#points.sort((p1, p2) => {
          const weight = getEmptyDate(p1.dateFrom, p2.dateFrom);
          const res = weight ?? dayjs(p1.dateFrom).diff(dayjs(p2.dateFrom));
          return res;
        });
        break;
      case SortTypes.TIME:
        this.#points.sort((p1, p2) => {
          const weight = getPeriod(p1, p2);
          const t1 = dayjs(p1.dateTo).diff(dayjs(p1.dateFrom));
          const t2 = dayjs(p2.dateTo).diff(dayjs(p2.dateFrom));
          const res = weight ?? t2 - t1;
          return res;
        });
        break;
      default: this.#points.sort((p1, p2) => p2.basePrice - p1.basePrice);
    }
    this.#nowTypeSort = sortTypes;
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
    this.#getedPoints = () => {
      const index = this.#getedPoints.findIndex((item) => item.id === upPoint.id);
      if (index === -1) {
        return this.#getedPoints;
      }
      return [
        ...this.#getedPoints.slice(0, index),
        upPoint,
        ...this.#getedPoints.slice(index + 1),
      ];
    };
    this.#eventsPresenter.get(upPoint.id).init(upPoint, this.#destinations);
  };

  #changingSortingType = (sortTypes) => {
    if (this.#nowTypeSort === sortTypes) {
      return;
    }

    this.#sortingPoints(sortTypes);
    this.#clearEventsList();
    this.#drawingPoints();
  };

  #clearEventsList = () => {
    this.#eventsPresenter.forEach((presenter) => presenter.destroy());
    this.#eventsPresenter.clear();
  };

  #getSort = () => {
    render(this.#sortComp, this.#tripContainer, RenderPosition.AFTERBEGIN);
    this.#sortComp.changingSortingType(this.#changingSortingType);
  };

  #getNoPoints = () => {
    render(this.#noPointsComp, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #getListPoints = () => {
    render(this.#eventsList, this.#tripContainer);
  };
}
