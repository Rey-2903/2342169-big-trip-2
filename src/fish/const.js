const TRIP_TYPES = ['taxi', 'bus', 'train', 'ship','drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FILTERS = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SORT = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const ACTIONS_POINTS = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UPDATE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const ERROR_UPDATE = 'You cannot update a non-existent point';
const ERROR_UP = 'The point cannot be updated';
const ERROR_ADD = 'The point cannot be add';
const ERROR_DELETE = 'You cannot delete a non-existent point';
const ERROR_DEL = 'The point cannot be delete';

const NO_POINTS_TEXT = {
  [FILTERS.EVERYTHING]: 'Click New Event to create your first point',
  [FILTERS.FUTURE]: 'There are no future points now',
  [FILTERS.PAST]: 'There are no past points today',
};

const HTTP_METHOD = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const AUTHORIZATION = 'Basic hdnc6kncga994k7lai32kz';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

const LIMIT = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const MODES_TYPE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export {
  TRIP_TYPES,
  FILTERS,
  SORT,
  ACTIONS_POINTS,
  UPDATE,
  ERROR_UPDATE,
  ERROR_UP,
  ERROR_ADD,
  ERROR_DELETE,
  ERROR_DEL,
  NO_POINTS_TEXT,
  HTTP_METHOD,
  AUTHORIZATION,
  END_POINT,
  LIMIT,
  MODES_TYPE,
};
