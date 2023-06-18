import EventsPresenter from './presenter/events-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import ListOffersModel from './model/list-offers-model.js';
import RoutePointModel from './model/route-point-model.js';
import FilterModel from './model/filter-model.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.trip-events');
const newEvent = siteHeaderElement.querySelector('.trip-main__event-add-btn');

const pointsModel = new PointsModel();
const offersModel = new ListOffersModel();
const routePointModel = new RoutePointModel();
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter(siteHeaderElement.querySelector('.trip-controls__filters'), filterModel, pointsModel);
const eventsPresenter = new EventsPresenter(siteMainElement, pointsModel, offersModel, routePointModel, filterModel);

const handleNewEventButtonClick = () => {
  eventsPresenter.createNewForm(() => { newEvent.disabled = false; });
  newEvent.disabled = true;
};

newEvent.addEventListener('click', handleNewEventButtonClick);
eventsPresenter.init();
filterPresenter.init();

