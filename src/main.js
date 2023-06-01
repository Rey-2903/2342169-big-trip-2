import FiltersView from './view/filters-view';
import ListEventPresenter from './presenter/events-presenter';
import {render} from './render';

const siteHeader = document.querySelector('.trip-main');
const siteMain = document.querySelector('.page-main');
const mainPresenter = new ListEventPresenter();

render(new FiltersView(), siteHeader.querySelector('.trip-controls__filters'));

mainPresenter.init(siteMain.querySelector('.trip-events'));
