import CreatingEvent from '../view/creating-event';
import EventAddBtn from '../view/event-add-btn';
import EventItem from '../view/event-item';
import SortView from '../view/sort-view';
import TripEventList from '../view/trip-event-list';
import {render} from '../render';

export default class ListEventPresenter {
  constructor() {
    this.eventList = new TripEventList();
  }

  init (eventContainer){
    this.eventContainer = eventContainer;

    render(new SortView(), this.eventContainer);
    render(this.eventList, this.eventContainer);
    render(new CreatingEvent(), this.eventList.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventItem(), this.eventList.getElement());
    }

    render(new EventAddBtn(), this.eventList.getElement());
  }
}

