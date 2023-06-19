const TRIP_TYPES = ['taxi', 'bus', 'train', 'ship','drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const MODES_TYPES = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

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
  UPDATE: 'UPDATE_POINT',
  ADD: 'ADD_POINT',
  DELETE: 'DELETE_POINT',
};

const UPDATE = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  IN: 'INIT',
};

const ERROR_UPDATE = 'You cannot update a non-existent point';
const ERROR_DELETE = 'You cannot delete a non-existent point';
const ERROR_UP_TASK = 'The task cannot be updated';
const AUTHORIZATION = 'Basic hdnc6kncga994k7lai32kz';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';

const HTTP_METHOD = {
  GET: 'GET',
  PUT: 'PUT',
};

export {
  TRIP_TYPES,
  MODES_TYPES,
  SORT,
  FILTERS,
  ACTIONS_POINTS,
  UPDATE,
  ERROR_UPDATE,
  ERROR_DELETE,
  ERROR_UP_TASK,
  AUTHORIZATION,
  END_POINT,
  HTTP_METHOD,
};

