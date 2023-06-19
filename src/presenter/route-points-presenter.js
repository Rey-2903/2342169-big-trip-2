import CardPointsView from '../view/card-points-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../framework/render.js';
import {
  ACTIONS_POINTS,
  UPDATE,
  MODES_TYPES,
} from '../fish/const.js';
import { dateValue, isNull } from '../utils';

export default class RoutePointsPresenter {
  #eventsList = null;
  #point = null;
  #eventComp = null;
  #editingEvent = null;
  #changeData = null;
  #changeMode = null;
  #mode = MODES_TYPES.DEFAULT;

  constructor (eventsList, changeData, changeMode) {
    this.#eventsList = eventsList;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, destinations, offers) => {
    this.#point = point;
    const pastEventComp = this.#eventComp;
    const pastEditingEvent = this.#editingEvent;

    this.#eventComp = new CardPointsView(point, destinations, offers);
    this.#editingEvent = new EditFormView(point, destinations, offers);

    this.#eventComp.setHandlerEditClick(this.#handleClick);
    this.#eventComp.setHandlerStarClick(this.#handleStarClick);
    this.#editingEvent.setFormSubmitHandler(this.#handleSubmit);
    this.#editingEvent.setFormCloseHandler(this.#handleClose);
    this.#editingEvent.setDeleteClickHandler(this.#handleDel);

    if (isNull(pastEventComp, pastEditingEvent)) {
      render(this.#eventComp, this.#eventsList);
      return;
    }

    if (this.#mode === MODES_TYPES.DEFAULT) { replace(this.#eventComp, pastEventComp); }
    if (this.#mode === MODES_TYPES.EDITING) { replace(this.#editingEvent, pastEditingEvent); }
    remove(pastEventComp);
    remove(pastEditingEvent);
  };

  zeroingView = () => {
    if (this.#mode !== MODES_TYPES.DEFAULT) {
      this.#editingEvent.reset(this.#point);
      this.#replaceFormEditPoint();
      document.removeEventListener('keydown', this.#handleEscKeyDown);
    }
  };

  destroy = () => {
    remove(this.#eventComp);
    remove(this.#editingEvent);
  };

  #replacePointEditForm = () => {
    replace(this.#editingEvent, this.#eventComp);
    this.#changeMode();
    this.#mode = MODES_TYPES.EDITING;
  };

  #replaceFormEditPoint = () => {
    replace(this.#eventComp, this.#editingEvent);
    this.#mode = MODES_TYPES.DEFAULT;
  };

  #handleEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#editingEvent.reset(this.#point);
      this.#replaceFormEditPoint();
      document.removeEventListener('keydown', this.#handleEscKeyDown);
    }
  };

  #handleClose = () => {
    this.#editingEvent.reset(this.#point);
    this.#replaceFormEditPoint();
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleClick = () => {
    this.#replacePointEditForm();
    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleStarClick = () => { this.#changeData(ACTIONS_POINTS.UPDATE, UPDATE.PATCH, {...this.#point, isFavourite: !this.#point.isFavourite},); };

  #handleSubmit = (update) => {
    const isMinorUpdate = !dateValue(this.#point.dateTo, update.dateTo)
    || !dateValue(this.#point.dateFrom, update.dateFrom)
    || this.#point.basePrice !== update.basePrice;
    this.#changeData(ACTIONS_POINTS.UPDATE, isMinorUpdate ? UPDATE.MINOR : UPDATE.PATCH, update,);
    this.#replaceFormEditPoint();
  };

  #handleDel = (point) => {
    this.#changeData(ACTIONS_POINTS.DELETE, UPDATE.MINOR, point,);
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };
}

