import FiltersView from './view/filters-view.js';
import EventsPresenter from './presenter/events-presenter';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');
const eventsPresenter = new EventsPresenter();

render(new FiltersView(), siteHeaderElement.querySelector('.trip-controls__filters'));

eventsPresenter.init(siteMainElement.querySelector('.trip-events'));
