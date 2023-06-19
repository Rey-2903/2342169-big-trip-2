import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import ListOffersModel from './model/list-offers-model.js';
import RoutePointModel from './model/route-point-model.js';
import FilterModel from './model/filter-model.js';
import Api from './api.js';
import { AUTHORIZATION, END_POINT } from './fish/const';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.trip-events');
const newEvent = siteHeaderElement.querySelector('.trip-main__event-add-btn');

const apiService = new Api(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel(apiService);
const listOffersModel = new ListOffersModel(apiService);
const routePointModel = new RoutePointModel(apiService);
const filtersModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteHeaderElement.querySelector('.trip-controls__filters'), filtersModel, pointsModel);
const eventsPresenter = new EventsPresenter(siteMainElement, pointsModel, listOffersModel, routePointModel, filtersModel);

const handleNewEventButtonClick = () => {
  eventsPresenter.createNewForm(() => { newEvent.disabled = false; });
  newEvent.disabled = true;
};

eventsPresenter.init();
filterPresenter.init();

listOffersModel.init().finally(() => {
  routePointModel.init().finally(() => {
    pointsModel.init().finally(() => {
      newEvent.addEventListener('click', handleNewEventButtonClick);
    });
  });
});
