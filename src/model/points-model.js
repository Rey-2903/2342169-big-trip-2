import {
  ERROR_UPDATE,
  ERROR_DELETE,
  ERROR_UP_TASK,
  UPDATE,
} from '../fish/const.js';
import Observable from '../framework/observable.js';
import { notNumNull } from '../utils';

export default class PointsModel extends Observable {
  #points = null;
  #api = null;

  constructor (api) {
    super();
    this.#api = api;
  }

  get points () { return this.#points; }

  init = async () => {
    try {
      const ev = await this.#api.points;
      this.#points = ev.map(this.#adaptToClient);
    }
    catch (error) { this.#points = []; }
    this._notify(UPDATE.IN);
  };

  updateEvent = async (update, temp) => {
    const id = this.#points.findIndex((point) => point.id === temp.id);
    if (id === -1) { throw new Error(ERROR_UPDATE); }
    try {
      const response = await this.#api.upInf(temp);
      const task = this.#adaptToClient(response);
      this.#points = [...this.#points.slice(0, id), task, ...this.#points.slice(id + 1),];
      this._notify(update, task);
    } catch (error) { throw new Error(ERROR_UP_TASK); }
  };

  addEvent = (update, temp) => {
    this.#points = [temp, ...this.#points,];
    this._notify(update, temp);
  };

  deleteEvent = (update, temp) => {
    const id = this.#points.findIndex((point) => point.id === temp.id);
    if (id === -1) { throw new Error(ERROR_DELETE); }
    this.#points = [...this.#points.slice(0, id), ...this.#points.slice(id + 1)];
    this._notify(update);
  };

  #adaptToClient = (ev) => {
    const transformation = {
      ...ev,
      basePrice: ev['base_price'],
      dateFrom: notNumNull(ev['date_from']) ? new Date(ev['date_from']) : ev['date_from'],
      dateTo: notNumNull(ev['date_to']) ? new Date(ev['date_to']) : ev['date_to'],
      isFavourite: ev['is_favorite'],
    };
    delete transformation['base_price'];
    delete transformation['date_from'] ;
    delete transformation['date_to'];
    delete transformation['is_favorite'];
    return transformation;
  };
}


