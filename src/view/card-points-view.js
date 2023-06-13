import { daysHumanize, timeHumanize, getTravelPeriod, getOffersByType, isZero } from '../utils';
import AbstractView from '../framework/view/abstract-view.js';
import ListOffersView from './list-offers-view.js';

const getOffersList = (reliableOffers, allOffers) => {
  if (isZero(reliableOffers, allOffers)) { return ''; }
  let offers = '';
  allOffers.offers.forEach((offer) => {
    if (reliableOffers.find((checkedOffer) => checkedOffer.id === offer.id)){
      offers += `<li class="event__offer">
                  <span class="event__offer-title">${offer.title}</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">${offer.price}</span>
                </li>`;
    }
  });

  return new ListOffersView(offers).template;
};

const creatingCardPointTemplate = (point, possibleRoutePoints , allOffers) => {
  const {basePrice, dateFrom, dateTo, destination, isFavourite, offers, type} = point;
  const star = isFavourite ? 'event__favorite-btn--active' : '';
  const offersList = getOffersList(offers.offers, getOffersByType(allOffers, type));
  const currentRoutePoint = possibleRoutePoints.find((item) => item.id === destination);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime=${dateFrom}>${daysHumanize(dateFrom)}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${currentRoutePoint.name}</h3>
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
      ${offersList}
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
  #allRoutePoints = null;
  #allOffers = null;

  constructor (point, allRoutePoints, allOffers) {
    super();
    this.#point = point;
    this.#allRoutePoints = allRoutePoints;
    this.#allOffers = allOffers;
  }

  get template () { return creatingCardPointTemplate (this.#point, this.#allRoutePoints, this.#allOffers); }

  setHandlerEditClick = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handlerEditClick);
  };

  #handlerEditClick = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };

  setHandlerStarClick = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#handlerStarInstallation);
  };

  #handlerStarInstallation = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
