import { getPoints } from '../fish/fish-data';

export default class PointsModel{
  #points = null;

  constructor () {
    this.#points = getPoints();
  }

  get points () { return this.#points;}
}
