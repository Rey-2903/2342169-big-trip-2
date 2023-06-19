import {
  UPDATE,
  ERROR_UPDATE,
  ERROR_UP,
  ERROR_ADD,
  ERROR_DELETE,
  ERROR_DEL,
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

  init = async () => {
    try {
      const ev = await this.#api.points;
      this.#points = ev.map(this.#adapterClient);
    }
    catch (error) { this.#points = []; }
    this._notify(UPDATE.INIT);
  };

  get points () { return this.#points; }

  updatePoint = async (type, update) => {
    const id = this.#points.findIndex((point) => point.id === update.id);
    if (id === -1) { throw new Error(ERROR_UPDATE); }
    try {
      const answer = await this.#api.updatePoint(update);
      const upPoint = this.#adapterClient(answer);
      this.#points = [...this.#points.slice(0, id), upPoint, ...this.#points.slice(id + 1),];
      this._notify(type, upPoint);
    }
    catch (error) { throw new Error(ERROR_UP); }
  };

  addPoint = async (type, update) => {
    try {
      const answer = await this.#api.addPoint(update);
      const newEv = this.#adapterClient(answer);
      this.#points = [newEv, ...this.#points];
      this._notify(type, newEv);
    }
    catch (error) { throw new Error(ERROR_ADD); }
  };

  deletePoint = async (type, update) => {
    const id = this.#points.findIndex((point) => point.id === update.id);
    if (id === -1) { throw new Error(ERROR_DELETE); }
    try {
      await this.#api.deletePoint(update);
      this.#points = [...this.#points.slice(0, id), ...this.#points.slice(id + 1),];
      this._notify(type);
    }
    catch (error) { throw new Error(ERROR_DEL); }
  };

  #adapterClient = (point) => {
    const redefinition = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: notNumNull(point['date_from'])
        ? new Date(point['date_from'])
        : point['date_from'],
      dateTo: notNumNull(point['date_to'])
        ? new Date(point['date_to'])
        : point['date_to'],
      isFavourite: point['is_favorite'],
    };
    delete redefinition['base_price'];
    delete redefinition['date_from'] ;
    delete redefinition['date_to'];
    delete redefinition['is_favorite'];
    return redefinition;
  };
}

