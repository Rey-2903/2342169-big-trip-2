import CardPointsView from '../view/card-points-view';
import EditFormView from '../view/edit-form-view';
import {isNull} from '../utils';
import {PointModes} from '../fish/const';
import { render, replace, remove } from '../framework/render.js';

export default class RoutePointsPresenter {
  #eventsList = null;
  #point = null;
  #pastPoint = null;
  #editingPoint = null;
  #changeData = null;
  #changeMode = null;
  #pointModes = PointModes.DEFAULT;

  constructor (eventsList, changeData, changeMode) {
    this.#eventsList = eventsList;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point, destinations) => {
    this.#point = point;

    const pastPoint = this.#pastPoint;
    const editingPoint = this.#editingPoint;

    this.#pastPoint = new CardPointsView(point, destinations);
    this.#editingPoint = new EditFormView(point, destinations);

    this.#pastPoint.handlerEditFormButton(this.#buttonClickHandler);
    this.#pastPoint.starInstallationHandler(this.#starClick);
    this.#editingPoint.submittingForm(this.#submittingEditForm);
    this.#editingPoint.closingForm(this.#closingForm);

    if (isNull(pastPoint, editingPoint)) {
      render(this.#pastPoint, this.#eventsList);
      return;
    }

    if (this.#pointModes === PointModes.EDITING) {
      replace(this.#editingPoint, editingPoint);
    }

    if (this.#pointModes === PointModes.DEFAULT) {
      replace(this.#pastPoint, pastPoint);
    }

    remove(pastPoint);
    remove(editingPoint);
  };

  resetView = () => {
    if (this.#pointModes !== PointModes.DEFAULT) {
      this.#replaceFormEditPoint();
    }
  };

  destroy = () => {
    remove(this.#pastPoint);
    remove(this.#editingPoint);
  };

  #replacePointEditForm = () => {
    replace(this.#editingPoint, this.#pastPoint);

    this.#changeMode();
    this.#pointModes = PointModes.EDITING;
  };

  #replaceFormEditPoint = () => {
    replace(this.#pastPoint, this.#editingPoint);
    this.#pointModes = PointModes.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormEditPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #buttonClickHandler = () => {
    this.#replacePointEditForm();
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  #submittingEditForm = (point) => {
    this.#changeData(point);
    this.#replaceFormEditPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #closingForm = () => {
    this.#replaceFormEditPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #starClick = () => {
    this.#changeData({...this.#point, isFavourite: !this.#point.isFavourite});
  };
}
