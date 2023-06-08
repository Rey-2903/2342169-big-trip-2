import ListEventsView from '../view/list-events-view';
import NoPointsView from '../view/no-points-view';
import CardPointsView from '../view/card-points-view';
import EditFormView from '../view/edit-form-view';
import SortView from '../view/sort-view';
import { render } from '../render.js';

export default class EventsPresenter {
  #eventsList = null;
  #tripContainer = null;
  #pointsModel = null;
  #points = null;
  #destinations = null;

  constructor() {
    this.#eventsList = new ListEventsView();
  }

  init (tripContainer, pointsModel, destinationsModel) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#points = [...this.#pointsModel.points];
    this.#destinations = destinationsModel.destinations;

    if(this.#points.length === 0){
      render(new NoPointsView(), this.#tripContainer);
    }

    else {
      render(new SortView(), this.#tripContainer);
      render(this.#eventsList, this.#tripContainer);

      for (let i = 0; i < this.#points.length; i++) {
        this.#drawingPoint(this.#points[i]);
      }
    }
  }

  #drawingPoint (point) {
    const pointInfForm = new CardPointsView(point, this.#destinations);
    const pointEditComponent = new EditFormView(point, this.#destinations);

    const replacePointEditForm = () => {
      this.#eventsList.element.replaceChild(pointEditComponent .element, pointInfForm .element);
    };

    const replaceFormEditPoint = () => {
      this.#eventsList.element.replaceChild(pointInfForm .element, pointEditComponent .element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormEditPoint ();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointInfForm .element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointEditForm ();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent .element.addEventListener('submit', (i) => {
      i.preventDefault();
      replaceFormEditPoint ();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent .element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceFormEditPoint ();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointInfForm , this.#eventsList.element);
  }
}
