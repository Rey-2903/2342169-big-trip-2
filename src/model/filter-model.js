import Observable from '../framework/observable.js';
import { FILTERS } from '../fish/const.js';

export default class FilterModel extends Observable {
  #filter = FILTERS.EVERYTHING;

  get filter() { return this.#filter; }

  setFilter = (update, filter) => {
    this.#filter = filter;
    this._notify(update, filter);
  };
}
