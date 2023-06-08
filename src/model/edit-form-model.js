import { getForm } from '../fish/edit-form';

export default class EditFormModel{
  #form = null;

  constructor () {
    this.#form = getForm();
  }

  get form () { return this.#form;}
}
