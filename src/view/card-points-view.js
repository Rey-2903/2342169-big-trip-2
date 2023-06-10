import AbstractView from '../framework/view/abstract-view';
import { humanizeDay, humanizeTime, getRoutePeriod } from '../utils.js';
import { getOffersByType } from '../fish/list-offers.js';
import ListOffersView from './list-offers-view.js';

const getOffers = (chooseElement, allElement) => {
  if (allElement.length === 0) {
    return '';
  }
  let offers = '';

  allElement.forEach((item) => {
    if (chooseElement.find((offer) => offer.id === item.id)){
      offers += `<li class="event__offer">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </li>`;
    }
  });

  return new ListOffersView(offers).template;
};

const creatingCardPointTemplate = (point, availablePoints) => {
  const {basePrice, dateFrom, dateTo, destination, isFavourite, offers, type} = point;
  const star = isFavourite ? 'event__favorite-btn--active' : '';
  const allOffers = getOffers(offers.offers, getOffersByType(type));
  const date = humanizeDay(dateFrom);
  const datesFrom = humanizeTime(dateFrom);
  const datesTo = humanizeTime(dateTo);
  const duration = getRoutePeriod(dateFrom, dateTo);
  const location = availablePoints.find((item) => item.id === destination);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${dateFrom}>${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${location.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${dateFrom}>${datesFrom}</time>
          &mdash;
          <time class="event__end-time" datetime=${dateTo}>${datesTo}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${allOffers}
      <button class="event__favorite-btn ${star}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
};

export default class CardPointsView extends AbstractView {
  #point = null;
  #allDestinations = null;

  constructor(point, allDestinations){
    super();
    this.#point = point;
    this.#allDestinations = allDestinations;
  }

  get template () {
    return creatingCardPointTemplate(this.#point, this.#allDestinations);
  }

  handlerEditFormButton = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonClickHandler);
  };

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  starInstallationHandler = (callback) => {
    this._callback.starClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#starClick);
  };

  #starClick = (evt) => {
    evt.preventDefault();
    this._callback.starClick();
  };
}
