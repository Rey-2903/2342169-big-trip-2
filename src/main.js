import FiltersView from './view/filters-view.js';
import EventsPresenter from './presenter/events-presenter';
import PointsModel from './model/points-model.js';
import DestinationModel from './model/destination-model';
import {getFilter} from './fish/filters.js';
import { render } from './framework/render.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const eventsPresenter = new EventsPresenter();

const pointsModel = new PointsModel();
const destinationModel = new DestinationModel();

render(new FiltersView(getFilter(pointsModel.points)), siteHeaderElement.querySelector('.trip-controls__filters'));

eventsPresenter.init(siteMainElement.querySelector('.trip-events'), pointsModel, destinationModel);


