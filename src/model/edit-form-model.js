import { getForm } from '../fish/edit-form';

export default class EditFormModel{
  constructor () {
    this.form = getForm();
  }

  getForm () { return this.form;}
}
