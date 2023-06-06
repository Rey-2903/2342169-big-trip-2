import FiltersView from './view/filters-view';
import ListEventPresenter from './presenter/events-presenter';
import { render } from './render.js';

const siteHeader = document.querySelector('.trip-main');
const siteMain = document.querySelector('.page-main');
const tripPresenter = new ListEventPresenter();

render(new FiltersView(), siteHeader.querySelector('.trip-controls__filters'));

tripPresenter.init(siteMain.querySelector('.trip-events'));
