import AbstractView from '../framework/view/abstract-view';
import {SortTypes} from '../fish/const';

const creatingSortTemplate = () => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--${SortTypes.DAY}">
      <input id="sort-${SortTypes.DAY}" data-sort-type=${SortTypes.DAY} class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortTypes.DAY}" checked>
      <label class="trip-sort__btn" for="sort-${SortTypes.DAY}">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--${SortTypes.TIME}">
      <input id="sort-${SortTypes.TIME}" data-sort-type=${SortTypes.TIME} class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortTypes.TIME}">
      <label class="trip-sort__btn" for="sort-${SortTypes.TIME}">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--${SortTypes.PRICE}">
      <input id="sort-${SortTypes.PRICE}" data-sort-type=${SortTypes.PRICE} class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${SortTypes.PRICE}">
      <label class="trip-sort__btn" for="sort-${SortTypes.PRICE}">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
);

export default class SortView extends AbstractView {
  get template () {
    return creatingSortTemplate();
  }

  changingSortingType = (callback) => {
    this._callback.sortByType = callback;
    this.element.addEventListener('click', this.#handlerChangingSortingType);
  };

  #handlerChangingSortingType = (i) => {
    if (i.target.tagName !== 'INPUT') {
      return;
    }
    this._callback.sortByType(i.target.dataset.sortType);
  };
}
