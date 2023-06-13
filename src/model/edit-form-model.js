import { getEditForm } from '../fish/fish-data';

export default class EditFormModel {
  #form = null;

  constructor () {
    this.#form = getEditForm();
  }

  get form () { return this.#form;}
}
