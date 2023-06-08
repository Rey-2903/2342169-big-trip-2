import { getPoint } from '../fish/points.js';
import { COUNT } from '../fish/const.js';

export default class PointsModel{
  #points = null;

  constructor (){
    this.#points = Array.from({length: COUNT}, getPoint);
  }

  get points () { return this.#points;}
}
