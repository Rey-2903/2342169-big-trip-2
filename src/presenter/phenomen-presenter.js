import CreatingEventView from '../view/creating-event-view';
import EditEventView from '../view/edit-event-view';
import TripEventListView from '../view/trip-event-list-view';
import WayView from '../view/way-view';
import SortView from '../view/sort-view.js';
import { render } from '../render.js';

export default class ListEventPresenter {
  constructor() {
    this.boardComponent = new TripEventListView();
  }

  init (tripContainer) {
    this.tripContainer = tripContainer;

    render(new SortView(), this.tripContainer);
    render(this.boardComponent, this.tripContainer);
    render(new EditEventView(), this.boardComponent.getElement());

    for (let i = 0; i < 3; i++){
      render(new WayView(), this.boardComponent.getElement());
    }

    render(new CreatingEventView(), this.boardComponent.getElement());
  }
}

