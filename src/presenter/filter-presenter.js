import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filters-view.js';
import { filteringEvents } from '../utils';
import { FILTERS, UPDATE } from '../fish/const.js';

export default class FilterPresenter {
  #filtCont = null;
  #filtComp = null;
  #filterModel = null;
  #pointsModel = null;

  constructor(filtCont, filterModel, pointsModel) {
    this.#filtCont = filtCont;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleEvent);
    this.#filterModel.addObserver(this.#handleEvent);
  }

  get filters() {
    return [
      {
        type: FILTERS.EVERYTHING,
        name: 'EVERYTHING',
        count: filteringEvents[FILTERS.EVERYTHING](this.#pointsModel.points).length,
      },
      {
        type: FILTERS.FUTURE,
        name: 'FUTURE',
        count: filteringEvents[FILTERS.FUTURE](this.#pointsModel.points).length,
      },
      {
        type: FILTERS.PAST,
        name: 'PAST',
        count: filteringEvents[FILTERS.PAST](this.#pointsModel.points).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const pastFilter = this.#filtComp;
    this.#filtComp = new FilterView(filters, this.#filterModel.filter);
    this.#filtComp.setChangeFilterType((filterType) => {
      if (this.#filterModel.filter === filterType) { return; }
      this.#filterModel.setFilter(UPDATE.MAJOR, filterType);
    });
    if (pastFilter === null) {
      render(this.#filtComp, this.#filtCont);
      return;
    }
    replace(this.#filtComp, pastFilter);
    remove(pastFilter);
  };

  #handleEvent = () => { this.init(); };
}

