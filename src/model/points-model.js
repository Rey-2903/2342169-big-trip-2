import { getPoint } from '../fish/points.js';
import { COUNT } from '../fish/const.js';

export default class PointsModel{
  constructor (){
    this.points = Array.from({length: COUNT}, getPoint);
  }

  getPoints () { return this.points;}
}
