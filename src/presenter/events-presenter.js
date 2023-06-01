import CreatingEventView from '../view/creating-event-view';
import EventAddBtn from '../view/event-add-btn';
import EventItemView from '../view/event-item-view';
import SortView from '../view/sort-view';
import TripEventListView from '../view/trip-event-list-view';
import {render} from '../render';

export default class ListEventPresenter {
  constructor() {
    this.eventList = new TripEventListView();
  }

  init (eventContainer){
    this.eventContainer = eventContainer;

    render(new SortView(), this.eventContainer);
    render(this.eventList, this.eventContainer);
    render(new CreatingEventView(), this.eventList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventItemView(), this.eventList.getElement());
    }

    render(new EventAddBtn(), this.eventList.getElement());
  }
}


