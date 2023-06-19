import { getPoint } from '../fish/fish-data';
import {
  POINTS_NUMBER,
  ERROR_UPDATE,
  ERROR_DELETE,
} from '../fish/const.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = null;

  constructor () {
    super();
    this.#points = Array.from({length: POINTS_NUMBER}, getPoint);
  }

  get points () { return this.#points; }

  updateEvent = (update, temp) => {
    const id = this.#points.findIndex((point) => point.id === temp.id);
    if (id === -1) { throw new Error(ERROR_UPDATE); }
    this.#points = [...this.#points.slice(0, id), temp, ...this.#points.slice(id + 1)];
    this._notify(update, temp);
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
}
