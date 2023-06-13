import { checkingInput, dateHumanize, getOffersByType, numIsNull, slice } from '../utils';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

const getOffersList = (reliableOffers, allOffers) => {
  if (allOffers.length === 0) { return ''; }

  return (`<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${allOffers.map((offer) => (
      `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden"
                  id="event-offer-${offer.id}" type="checkbox" name="event-offer-comfort"
                  ${reliableOffers.find((checkedOffer) => checkedOffer.id === offer.id) ? 'checked' : ''}>
                  <label class="event__offer-label" for="event-offer-${offer.id}">
                    <span class="event__offer-title">${offer.title}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${offer.price}</span>
                  </label>
                </div>`)).join('')}
            </div>
          </section>`);
};

const getRoutePointsList = (thisDestination, routePoint, type) => {
  const routePointType = routePoint.find((item) => item.type === type);
  const allRoutePoint = routePointType ? routePointType : routePoint;

  return(
    `<div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value='${thisDestination}' list="destination-list-1">
      ${`<datalist id="destination-list-1">
          ${allRoutePoint.map((item) =>`<option value='${item.name}'></option>`).join('')}
        </datalist>`}
    </div>`);
};

const getImageList = (items) => {
  if (numIsNull(items)) { return ''; }

  return (
    `<div class="event__photos-container">
      <div class="event__photos-tape">
      ${items.map((item) => `<img class="event__photo" src='${item.src}' alt='${item.description}'></img>`).join('')}
      </div>
    </div>`);
};

const getRoutePointList = (routePoint) => {
  const description = routePoint.description !== null ? routePoint.description : '';

  return(
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${getImageList(routePoint.pictures)}
    </section>`);
};

const creatingEditFormTemplate = (form, allRoutePoints, offersType) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = form;
  const offersList = getOffersList(offers.offers, offersType.offers);
  const curRoutePoint = allRoutePoints.find((item) => item.id === destination);
  const routePointList = numIsNull(curRoutePoint.description) && numIsNull(curRoutePoint.pictures) ? '' : getRoutePointList(curRoutePoint);

  return(
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

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>
      ${getRoutePointsList(curRoutePoint.name, allRoutePoints, type)}
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

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      ${offersList}
      ${routePointList}
    </section>
  </form>
</li>`
  );
};

export default class EditFormView extends AbstractStatefulView {
  _state = null;
  #routePoint = null;
  #allOffers = null;
  #offersType = null;

  constructor(form, allRoutePoint, allOffers){
    super();
    this._state = EditFormView.parseFormToState(form);
    this.#routePoint = allRoutePoint;
    this.#allOffers = allOffers;
    this.#offersType = getOffersByType(allOffers, this._state.type);

    this.#setOtherHandler();
  }

  get template () { return creatingEditFormTemplate(this._state, this.#routePoint, this.#offersType); }

  reset = (point) => {
    this.updateElement(
      EditFormView.parseFormToState(point),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#handlerSubmitForm);
  };

  #handlerSubmitForm = (i) => {
    i.preventDefault();
    this._callback.formSubmit(EditFormView.parseStateToForm(this._state));
  };

  setFormCloseHandler = (callback) => {
    this._callback.formClose = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#handlerClosingForm);
  };

  #handlerClosingForm = (i) => {
    i.preventDefault();
    this._callback.formClose();
  };

  _restoreHandlers = () => {
    this.#setOtherHandler();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormCloseHandler(this._callback.formClose);
  };

  #setOtherHandler = () => {
    this.element.querySelector('.event__type-list').addEventListener('click', this.#handlerTypePoints);
    if (this.#offersType.length > 0) {
      this.element.querySelector('.event__available-offers').addEventListener('click', this.#handlerOffers);
    }
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#handlerInputRoutePoint);
  };

  #handlerTypePoints = (i) => { if (checkingInput(i)) { this.updateElement({type: i.target.value,}); } };

  #handlerOffers = (i) => {
    if(checkingInput(i)) {
      i.preventDefault();
      const news = this.#offersType.find((offer) => offer.id === Number(slice(i))).id;
      if (this._state.offers.includes(news)) { this._state.offers = this._state.offers.filter((n) => n !== Number(slice(i))); }
      else { this._state.offers.push(Number(slice(i))); }
      this.updateElement({ offers: this._state.offers, });
    }
  };

  #handlerInputRoutePoint = (i) => {
    i.preventDefault();
    const newRoutePoint = this.#routePoint.find((item) => item.name === i.target.value);
    if (newRoutePoint) { this.updateElement({ destination: newRoutePoint.id, }); }
  };

  static parseFormToState = (form) => ({...form});
  static parseStateToForm = (state) => ({...state});
}
