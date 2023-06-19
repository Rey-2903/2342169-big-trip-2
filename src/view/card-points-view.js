import he from 'he';
import {
  daysHumanize,
  timeHumanize,
  getTravelPeriod,
  getOffersByType,
  isZero,
} from '../utils';
import AbstractView from '../framework/view/abstract-view.js';
import ListOffersView from './list-offers-view.js';

const getOffersList = (checkedOfferIds, allOffers) => {
  const offersLeng = allOffers.length;
  const checkLeng = checkedOfferIds.length;
  if (isZero(offersLeng, checkLeng)) { return ''; }
  let offers = '';
  allOffers.forEach((offer) => {
    if (checkedOfferIds.includes(offer.id)){
      offers += `<li class="event__offer">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </li>`;
    }
  });
  return new ListOffersView(offers).template;
};

const creatingCardPointTemplate = (point, availableDestinations, allOffers) => {
  const {basePrice, dateFrom, dateTo, destination, isFavourite, offers, type} = point;

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${dateFrom}>${daysHumanize(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${he.encode(availableDestinations.find((item) => item.id === destination).name)}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime=${dateFrom}>${timeHumanize(dateFrom)}</time>
          &mdash;
          <time class="event__end-time" datetime=${dateTo}>${timeHumanize(dateTo)}</time>
        </p>
        <p class="event__duration">${getTravelPeriod(dateFrom, dateTo)}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      ${getOffersList(offers, getOffersByType(allOffers, type).offers)}
      <button class="event__favorite-btn ${isFavourite ? 'event__favorite-btn--active' : ''}" type="button">
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
  #allRoutePoints = null;
  #allOffers = null;

  constructor(point, allRoutePoints, allOffers){
    super();
    this.#point = point;
    this.#allRoutePoints = allRoutePoints;
    this.#allOffers = allOffers;
  }

  get template () { return creatingCardPointTemplate(this.#point, this.#allRoutePoints, this.#allOffers); }

  setHandlerEditClick = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handlerEditClick);
  };

  #handlerEditClick = (i) => {
    i.preventDefault();
    this._callback.editClick();
  };

  setHandlerStarClick = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#handlerStarInstallation);
  };

  #handlerStarInstallation = (i) => {
    i.preventDefault();
    this._callback.favoriteClick();
  };
}
