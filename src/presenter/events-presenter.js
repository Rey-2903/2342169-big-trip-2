import EventAddBtn from '../view/event-add-btn';
import CreatingEventView from '../view/creating-event-view';
import SortView from '../view/sort-view.js';
import EventItemView from '../view/event-item-view';
import TripEventListView from '../view/trip-event-list-view';
import { render } from '../render.js';

export default class ListEventPresenter{
  constructor() {
    this.eventsList = new TripEventListView();
  }

  init (tripContainer){
    this.tripContainer = tripContainer;

    render(new SortView(), this.tripContainer);
    render(this.eventsList, this.tripContainer);
    render(new CreatingEventView(), this.eventsList.getElement());

    for(let i = 0; i < 3; i++){
      render(new EventItemView(), this.eventsList.getElement());
    }

    render(new EventAddBtn(), this.eventsList.getElement());
  }
}
