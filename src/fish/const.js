const TYPES = ['taxi', 'bus', 'train', 'ship','drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const COUNT = 10;
const DESTINATIONS = ['Crimea', 'Paris', 'Peter', 'Sochi', 'Moscow', 'Istanbul', 'Tokyo', 'Rome', 'Dubai'];
const OFFERS = ['Change to Business Class', 'Add breakfast', 'Add dinner', 'Carsharing', 'Reserve tickets',];

const DESCRIPTIONS = [
  'This is a perfect place for vacation with children.',
  'There are wonderful beaches and sunny days.',
  'You can easily get lost in this tangled streets.',
  'A nice city with cozy cafes and green alleys.',
  'Beatiful, modern city located in the coldest region of the country.',
  null,
];

const IMAGE_DISCRIPTIONS = ['Pleasant place', 'Beautiful views', 'Live picture', 'Vintage city',];

const FiltersTypes = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const SortTypes = {
  PRICE: 'price',
  TIME: 'time',
  DAY: 'day',
};

const PointModes = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const ImageInf = { COUNT: 5, SRC: 100 };

const Prices = { MIN: 150, MAX: 4000 };

const NumberServices = { MIN: 0, MAX: 5 };

export {FiltersTypes, SortTypes, TYPES, COUNT, DESTINATIONS, OFFERS, DESCRIPTIONS, PointModes, IMAGE_DISCRIPTIONS, ImageInf, Prices, NumberServices};
