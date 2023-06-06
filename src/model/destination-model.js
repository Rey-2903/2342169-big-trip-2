import { getDestination } from '../fish/destination';
import { DESTINATIONS } from '../fish/const.js';

export default class DestinationModel{
  constructor (){
    this.destinations = Array.from({length: DESTINATIONS.length},(value, index) => getDestination(index));
  }

  getDestinations () {return this.destinations;}
}
