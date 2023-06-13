import { render } from './framework/render.js';
import { getFilter } from './fish/fish-data';
import FiltersView from './view/filters-view';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';
import ListOffersModel from './model/list-offers-model.js';
import RoutePointModel from './model/route-point-model.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');

const eventsPresenter = new EventsPresenter();
const pointsModel = new PointsModel();
const routePointModel = new RoutePointModel();
const listOffersModel = new ListOffersModel();
const filters = getFilter(pointsModel.points);

render(new FiltersView(filters), siteHeaderElement.querySelector('.trip-controls__filters'));
eventsPresenter.init(siteMainElement.querySelector('.trip-events'), pointsModel, routePointModel, listOffersModel);
