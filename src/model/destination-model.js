import { getDestination } from '../fish/fish-data';
import { DESTINATIONS } from '../fish/const.js';

const leng = DESTINATIONS.length;
export default class DestinationModel{
  #destinations = null;

  constructor (){
    this.#destinations = Array.from({length: leng},(value, index) => getDestination(index));
  }

  get destinations () {return this.#destinations;}
}
