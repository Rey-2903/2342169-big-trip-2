import {dateHumanize, getOffersByType, bigLetter, zeroNum, isNull, numIsNull, isInput, slice} from '../utils';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { TRIP_TYPES } from '../fish/const.js';
import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const offersList = (checkOffers, allOffers) => (allOffers.map((offer) => (
  `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
      id="event-offer-${offer.id}" type="checkbox" name="event-offer-comfort"
      ${checkOffers.includes(offer.id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
  </div>`)).join('')
);

const getOffersList = (checkOffers, allOffers) => {
  if (zeroNum(allOffers.length)) { return ''; }
  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${offersList(checkOffers, allOffers)}
      </div>
    </section>`
  );
};

const getRoutePointList = (thisDestination, routePoint, type) => {
  const routePointType = routePoint.find((item) => item.type === type);
  const allRoutePoint = routePointType ? routePointType : routePoint;
  return(
    `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
    ${type}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value='${he.encode(thisDestination)}' list="destination-list-1">
    ${`<datalist id="destination-list-1">
          ${allRoutePoint.map((item) =>`<option value='${item.name}'></option>`).join('')}
      </datalist>`}
    </div>`);
};

const getEventTypesList = (currentType) => (
  TRIP_TYPES.map((eventType) => (
    `<div class="event__type-item">
        <input id="event-type-${eventType}-1" class="event__type-input  visually-hidden"
        type="radio" name="event-type" value="${eventType}" ${eventType === currentType ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${eventType}" for="event-type-${eventType}-1">
            ${bigLetter(eventType)}
        </label>
    </div>`)).join('')
);

const getImageList = (items) => {
  if (items === null) { return ''; }
  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${items.map((item) => `<img class="event__photo" src='${item.src}' alt='${item.description}'></img>`).join('')}
      </div>
    </div>`);
};

const creatingEditFormTemplate = (form, allRoutePoint, offersByType) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = form;
  const curRoutePoint = allRoutePoint.find((item) => item.id === destination);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${getEventTypesList(type)}
            </fieldset>
          </div>
        </div>
        ${getRoutePointList(curRoutePoint.name, allRoutePoint, type)}
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value='${dateHumanize(dateFrom)}'>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value='${dateHumanize(dateTo)}'>
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit" ${(isNull(dateFrom, dateTo)) ? 'disabled' : ''}>Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${getOffersList(offers, offersByType.offers)}
        ${(numIsNull(curRoutePoint.description) && numIsNull(curRoutePoint.pictures)) ? '' :
      `<section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${curRoutePoint.description !== null ? curRoutePoint.description : ''}</p>
          ${getImageList(curRoutePoint.pictures)}
      </section>`
    }
      </section>
    </form>
  </li>`
  );
};

export default class CreateFormView extends AbstractStatefulView {
  _state = null;
  #routePoint = null;
  #allOffers = null;
  #startingDate = null;
  #finishDate = null;
  #offersType = null;

  constructor(form, allRoutePoint, allOffers){
    super();
    this._state = CreateFormView.parseFormState(form);
    this.#routePoint = allRoutePoint;
    this.#allOffers = allOffers;
    this.#offersType = getOffersByType(this.#allOffers, this._state.type);

    this.#setOtherHandler();
    this.#setStartingDate();
    this.#setFinishDat();
  }

  get template () { return creatingEditFormTemplate(this._state, this.#routePoint, this.#offersType); }

  removeElement = () => {
    super.removeElement();
    if (this.#startingDate && this.#finishDate) {
      this.#startingDate.destroy();
      this.#finishDate.destroy();
      this.#startingDate = null;
      this.#finishDate = null;
    }
  };

  reset = (point) => { this.updateElement( CreateFormView.parseFormState(point), );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#handlerSubmitForm);
  };

  #handlerSubmitForm = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(CreateFormView.parseStateForm(this._state));
  };

  setFormCloseHandler = (callback) => {
    this._callback.formClose = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handlerClosingForm);
  };

  #handlerClosingForm = (evt) => {
    evt.preventDefault();
    this._callback.formClose();
  };

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#handlerDeleteClick);
  };

  #handlerDeleteClick = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(CreateFormView.parseStateForm(this._state));
  };

  _restoreHandlers = () => {
    this.#setOtherHandler();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.formClose);
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.#setStartingDate();
    this.#setFinishDat();
  };

  #setOtherHandler = () => {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#handlerPointType);
    if (this.#offersType.offers.length > 0) { this.element.querySelector('.event__available-offers').addEventListener('click', this.#handlerOffers); }
    this.element.querySelector('.event__input--price').addEventListener('input', this.#handlerCostInput);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#handlerRoutePointInput);
  };

  #setStartingDate = () => {
    this.#startingDate = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        minDate: this._state.dateFrom,
        onChange: ([date]) => { this.updateElement({ dateFrom: date, }); },
      },
    );
  };

  #setFinishDat = () => {
    this.#finishDate = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: ([date]) => { this.updateElement({ dateTo: date, }); },
      },
    );
  };

  #handlerPointType = (i) => {
    if (isInput(i.target.tagName)) {
      this.#offersType = getOffersByType(this.#allOffers, i.target.value);
      this.updateElement({ type: i.target.value, offers: [], });
    }
  };

  #handlerOffers = (i) => {
    if (isInput(i.target.tagName)) {
      i.preventDefault();
      if (this._state.offers.includes(Number(slice(i)))) { this._state.offers = this._state.offers.filter((id) => id !== Number(slice(i))); }
      else { this._state.offers.push(Number(slice(i))); }
      this.updateElement({ offers: this._state.offers, });
    }
  };

  #handlerRoutePointInput = (i) => {
    i.preventDefault();
    const newRoutePoint = this.#routePoint.find((item) => item.name === i.target.value);
    if (newRoutePoint) { this.updateElement({ destination: newRoutePoint.id, }); }
  };

  #handlerCostInput = (i) => {
    i.preventDefault();
    const newCost = Number(i.target.value);
    if (Number.isFinite(newCost) && newCost >= 0) { this._setState({ basePrice: newCost, }); }
  };

  static parseFormState = (form) => ({...form});
  static parseStateForm = (state) => ({...state});
}


