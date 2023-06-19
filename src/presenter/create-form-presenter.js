import CreateFormView from '../view/create-form-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { ACTIONS_POINTS, UPDATE, TRIP_TYPES } from '../fish/const.js';
import {notNumNull, numIsNull} from '../utils';
import dayjs from 'dayjs';

export default class CreateFormPresenter {
  #eventsList = null;
  #createForm = null;
  #changeData = null;
  #deleteCallb = null;
  #offers = null;
  #routePoint = null;

  constructor (eventsList, changeData, routePoint, offers) {
    this.#eventsList = eventsList;
    this.#changeData = changeData;
    this.#offers = offers;
    this.#routePoint = routePoint;
  }

  init = (callback) => {
    this.#deleteCallb = callback;
    if (notNumNull(this.#createForm)) { return; }
    this.#createForm = new CreateFormView(this.#getEmptyForm(), this.#routePoint, this.#offers);
    this.#createForm.setFormSubmitHandler((point) => { this.#changeData(ACTIONS_POINTS.ADD_POINT, UPDATE.MINOR, point);});
    this.#createForm.setFormCloseHandler(() => this.destroy());
    this.#createForm.setDeleteClickHandler(() => this.destroy());
    render(this.#createForm, this.#eventsList, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#handleEscKeyDown);
  };

  destroy = () => {
    if (numIsNull(this.#createForm)) { return; }
    this.#deleteCallb?.();
    remove(this.#createForm);
    this.#createForm = null;
    document.removeEventListener('keydown', this.#handleEscKeyDown);
  };

  setSaving = () => { this.#createForm.updateElement({ isDisabled: true, isSaving: true, }); };

  setAborting = () => {
    const resetFormState = () => {
      this.#createForm.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#createForm.shake(resetFormState);
  };

  #getEmptyForm = () => ({
    'basePrice': 1,
    'dateFrom': dayjs().toDate(),
    'dateTo': dayjs().toDate(),
    'destination': this.#routePoint[0].id,
    'id': 0,
    'isFavourite': false,
    'offers': [],
    'type': TRIP_TYPES[0],
  });

  #handleEscKeyDown = (i) => {
    if (i.key === 'Escape' || i.key === 'Esc'){
      i.preventDefault();
      this.destroy();
    }
  };
}
