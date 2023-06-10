import { getForm } from '../fish/fish-data';

export default class EditFormModel{
  #form = null;

  constructor () {
    this.#form = getForm();
  }

  get form () { return this.#form;}
}
