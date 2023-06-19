import CardPointsView from '../view/card-points-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isDate, isNull } from '../utils';
import { ACTIONS_POINTS, UPDATE, MODES_TYPE } from '../fish/const.js';

export default class RoutePointsPresenter {
  #eventsList = null;
  #point = null;
  #eventComp = null;
  #editingEvent = null;
  #changeData = null;
  #changeMode = null;
  #mode = MODES_TYPE.DEFAULT;

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
    this.#eventComp.setHandlerStarClick(this.#handleClickStar);
    this.#editingEvent.setFormSubmitHandler(this.#handleSubmit);
    this.#editingEvent.setFormCloseHandler(() => this.#closeForm());
    this.#editingEvent.setDeleteClickHandler(this.#handleDelete);

    if (isNull(pastEventComp, pastEditingEvent)) {
      render(this.#eventComp, this.#eventsList);
      return;
    }
    if (this.#mode === MODES_TYPE.DEFAULT) { replace(this.#eventComp, pastEventComp); }
    if (this.#mode === MODES_TYPE.EDITING) {
      replace(this.#eventComp, pastEditingEvent);
      this.#mode = MODES_TYPE.DEFAULT;
    }
    remove(pastEventComp);
    remove(pastEditingEvent);
  };

  resetView = () => { if (this.#mode !== MODES_TYPE.DEFAULT) { this.#closeForm(); } };

  destroy = () => {
    remove(this.#eventComp);
    remove(this.#editingEvent);
  };

  setSaving = () => {
    if (this.#mode === MODES_TYPE.EDITING) {
      this.#editingEvent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === MODES_TYPE.EDITING) {
      this.#editingEvent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  setAborting = () => {
    if (this.#mode === MODES_TYPE.DEFAULT) {
      this.#eventComp.shake();
      return;
    }
    const resetFormState = () => {
      this.#editingEvent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#editingEvent.shake(resetFormState);
  };

  #closeForm = () => {
    this.#editingEvent.reset(this.#point);
    this.#replaceFormEditPoint();
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };

  #replacePointEditForm = () => {
    replace(this.#editingEvent, this.#eventComp);
    this.#changeMode();
    this.#mode = MODES_TYPE.EDITING;
  };

  #replaceFormEditPoint = () => {
    replace(this.#eventComp, this.#editingEvent);
    this.#mode = MODES_TYPE.DEFAULT;
  };

  #handleEscKeyDown = (i) => {
    if (i.key === 'Escape' || i.key === 'Esc') {
      i.preventDefault();
      this.#closeForm();
    }
  };

  #handleClick = () => {
    this.#replacePointEditForm();
    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleClickStar = () => { this.#changeData(ACTIONS_POINTS.UPDATE_POINT, UPDATE.PATCH, {...this.#point, isFavourite: !this.#point.isFavourite},); };

  #handleSubmit = (update) => {
    const isMinorUpdate = !isDate(this.#point.dateTo, update.dateTo)
    || !isDate(this.#point.dateFrom, update.dateFrom)
    || this.#point.basePrice !== update.basePrice;
    this.#changeData(
      ACTIONS_POINTS.UPDATE_POINT,
      isMinorUpdate ? UPDATE.MINOR : UPDATE.PATCH,
      update,
    );
  };

  #handleDelete = (point) => {
    this.#changeData(ACTIONS_POINTS.DELETE_POINT, UPDATE.MINOR, point,);
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };
}
