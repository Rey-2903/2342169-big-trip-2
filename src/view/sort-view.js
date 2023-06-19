import AbstractView from '../framework/view/abstract-view.js';
import { SORT } from '../fish/const.js';
import { isNotInput } from '../utils';

const creatingSortTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SORT).map((sortType) => (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" data-sort-type="${sortType}"
        type="radio" name="trip-sort" value="sort-${sortType}"
        ${sortType === SORT.EVENT || sortType === SORT.OFFER ? 'disabled' : ''}
        ${sortType === currentSortType ? 'checked' : ''}
      >
      <label class="trip-sort__btn" for="sort-${sortType}">
        ${sortType === SORT.OFFER ? 'Offers' : sortType}
      </label>
    </div>`)).join('')}
  </form>`
);

export default class SortView extends AbstractView {
  #sortType = null;

  constructor (sortType) {
    super();
    this.#sortType = sortType;
  }

  get template () { return creatingSortTemplate(this.#sortType); }

  setChangeSort = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#handlerChangeSort);
  };

  #handlerChangeSort = (i) => {
    if (isNotInput(i.target.tagName)) { return; }
    this._callback.sortTypeChange(i.target.dataset.sortType);
  };
}

