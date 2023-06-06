import FiltersView from './view/filters-view';
import {render} from './render.js';
import ModelPresenter from './presenter/modal-presenter';
import PointsModel from './model/point-model.js';
import { getPoints, getDestinations, getOffersByType } from './fish/point.js';

const siteMain = document.querySelector('.page-main');
const siteHeader = document.querySelector('.trip-main');
const modalPresenter = new ModelPresenter(siteMain.querySelector('.trip-events'));
const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();

render(new FiltersView(), siteHeader.querySelector('.trip-controls__filters'));

pointsModel.init(points, destinations, offersByType);
modalPresenter.init(pointsModel);
