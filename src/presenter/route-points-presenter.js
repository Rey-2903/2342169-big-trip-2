import CardPointsView from '../view/card-points-view.js';
import EditFormView from '../view/edit-form-view.js';
import { isNull } from '../utils';
import { MODESTYPES } from '../fish/const';
import { render, replace, remove } from '../framework/render.js';

export default class RoutePointsPresenter {
  #eventsList = null;
  #point = null;
  #eventComp = null;
  #editingEvent = null;
  #changeData = null;
  #changeMode = null;

  #mode = MODESTYPES.DEFAULT;

  constructor (eventsList, changeData, changeMode) {
    this.#eventsList = eventsList;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, routePoint, offers) => {
    this.#point = point;

    const prevEventComp = this.#eventComp;
    const prevEditingEvent = this.#editingEvent;

    this.#eventComp = new CardPointsView(point, routePoint, offers);
    this.#editingEvent = new EditFormView(point, routePoint, offers);

    this.#eventComp.setHandlerEditClick(this.#handleEditClick);
    this.#eventComp.setHandlerStarClick(this.#handleStarClick);
    this.#editingEvent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#editingEvent.setFormCloseHandler(this.#closingEditForm);

    if (isNull(prevEventComp, prevEditingEvent)) {
      render(this.#eventComp, this.#eventsList);
      return;
    }
    if (this.#mode === MODESTYPES.DEFAULT) { replace(this.#eventComp, prevEventComp); }
    if (this.#mode === MODESTYPES.EDITING) { replace(this.#editingEvent, prevEditingEvent);}

    remove(prevEventComp);
    remove(prevEditingEvent);
  };

  zeroingView = () => {
    if (this.#mode !== MODESTYPES.DEFAULT) {
      this.#replaceFormEditPoint();
      this.#editingEvent.reset(this.#point);
    }
  };

  destroy = () => {
    remove(this.#eventComp);
    remove(this.#editingEvent);
  };

  #replacePointEditForm = () => {
    replace(this.#editingEvent, this.#eventComp);
    this.#changeMode();
    this.#mode = MODESTYPES.EDITING;
  };

  #replaceFormEditPoint = () => {
    replace(this.#eventComp, this.#editingEvent);
    this.#mode = MODESTYPES.DEFAULT;
  };

  #handleEscKeyDown = (i) => {
    if (i.key === 'Escape' || i.key === 'Esc') {
      i.preventDefault();
      this.#editingEvent.reset(this.#point);
      this.#replaceFormEditPoint();
      document.removeEventListener('keydown', this.#handleEscKeyDown);
    }
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormEditPoint();
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };

  #closingEditForm = () => {
    this.#editingEvent.reset(this.#point);
    this.#replaceFormEditPoint();
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleEditClick = () => {
    this.#replacePointEditForm();
    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  #handleStarClick = () => {
    this.#changeData({...this.#point, isFavourite: !this.#point.isFavourite});
  };
}
