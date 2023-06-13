import AbstractView from '../framework/view/abstract-view.js';
import { SORT } from '../fish/const';

const creatingSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.values(SORT).map((sortType) => (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
        <input id="sort-${sortType}" class="trip-sort__input  visually-hidden" data-sort-type="${sortType}"
         type="radio" name="trip-sort" value="sort-${sortType}"
         ${sortType === SORT.EVENT || sortType === SORT.OFFER ? 'disabled' : ''}
         ${sortType === SORT.DAY ? 'checked' : ''}
        >
        <label class="trip-sort__btn" for="sort-${sortType}">
            ${sortType === SORT.OFFER ? 'Offers' : sortType}
        </label>
     </div>`)).join('')}
  </form>`
);

export default class SortView extends AbstractView {
  get template () { return creatingSortTemplate (); }

  setSortHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#handlerSort);
  };

  #handlerSort = (i) => {
    if (i.target.tagName !== 'INPUT') { return; }
    this._callback.sortTypeChange(i.target.dataset.sortType);
  };
}
