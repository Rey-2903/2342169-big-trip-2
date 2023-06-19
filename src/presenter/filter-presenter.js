import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filters-view.js';
import { filteringEvents, numIsNull } from '../utils';
import { FILTERS, UPDATE } from '../fish/const.js';

export default class FilterPresenter {
  #filtCont = null;
  #filtComp = null;
  #pointsModel = null;
  #filterComponent = null;

  constructor(filtCont, filtComp, pointsModel) {
    this.#filtCont = filtCont;
    this.#filtComp = filtComp;
    this.#pointsModel = pointsModel;
    this.#pointsModel.addObserver(this.#handleEvent);
    this.#filtComp.addObserver(this.#handleEvent);
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
    const pastFilter = this.#filterComponent;
    this.#filterComponent = new FilterView(filters, this.#filtComp.filter);
    this.#filterComponent.setChangeFilterType(this.#handleChangeFilter);
    if (numIsNull(pastFilter)) {
      render(this.#filterComponent, this.#filtCont);
      return;
    }
    replace(this.#filterComponent, pastFilter);
    remove(pastFilter);
  };

  #handleEvent = () => { this.init(); };

  #handleChangeFilter = (filterType) => {
    if (this.#filtComp.filter === filterType) { return; }
    this.#filtComp.setFilter(UPDATE.MAJOR, filterType);
  };
}

