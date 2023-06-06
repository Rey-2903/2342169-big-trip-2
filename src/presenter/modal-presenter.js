import EditEventView from '../view/edit-event-view';
import TripEventListView from '../view/trip-event-list-view';
import SortView from '../view/sort-view.js';
import ViewingPointView from '../view/viewing-point-view';
import { render } from '../render.js';

export default class ModelPresenter {
  #modelComponent = null;
  #modelContainer = null;
  #pointsModel = null;
  #modalPoints = null;
  #destinations = null;
  #offers = null;

  constructor(modelContainer) {
    this.#modelComponent = new TripEventListView();
    this.#modelContainer = modelContainer;
  }

  init(pointsModel) {
    this.#pointsModel = pointsModel;
    this.#modalPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    render(new SortView(), this.#modelContainer);
    render(this.#modelComponent, this.#modelContainer);

    for (const point of this.#modalPoints){
      this.#drawingPoint(point);
    }
  }

  #drawingPoint = (point) => {
    const pointInfForm = new ViewingPointView(point, this.#destinations, this.#offers);
    const pointEditComponent = new EditEventView(point, this.#destinations, this.#offers);

    const replacePointEditForm = () => {
      this.#modelComponent.element.replaceChild(pointEditComponent.element, pointInfForm.element);
    };

    const replaceFormEditPoint = () => {
      this.#modelComponent.element.replaceChild(pointInfForm.element, pointEditComponent.element);
    };

    const EscKey = (key) => {
      if (key.key === 'Escape' || key.key === 'Esc') {
        key.preventDefault();
        replaceFormEditPoint();
        document.removeEventListener('keydown', EscKey);
      }
    };

    pointInfForm.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointEditForm();
      document.addEventListener('keydown', EscKey);
    });

    pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', (key) => {
      key.preventDefault();
      replaceFormEditPoint();
      document.removeEventListener('keydown', EscKey);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (key) => {
      key.preventDefault();
      replaceFormEditPoint();
      document.removeEventListener('keydown', EscKey);
    });

    render(pointInfForm, this.#modelComponent.element);
  };
}

