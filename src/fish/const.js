const POINTSNUMBER = 10;
const TRIPTYPES = ['taxi', 'bus', 'train', 'ship','drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const TYPESLENG = TRIPTYPES.length;
const ROUTEPOINTS = ['Crimea', 'Paris', 'Peter', 'Sochi', 'Moscow', 'Istanbul', 'Tokyo', 'Rome', 'Dubai'];
const ROUTEPOINTSLENG = ROUTEPOINTS.length;

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.'
];

const DESCRLENG = DESCRIPTIONS.length;

const OFFERS = [
  'Add a child safety seat',
  'Stay overnight',
  'Add lunch',
  'Rent a polaroid',
  'Add a place for a pet',
  'Book a window seat',
  'Book a place in the recreation area',
  'Use the translator service',
  'Upgrade to a business class',
  'Change to Business Class',
  'Add breakfast',
  'Add dinner',
  'Carsharing',
  'Reserve tickets',
];
const OFFERSLENG = OFFERS.length;

const IMAGEDESCR = ['Pleasant place', 'Beautiful views', 'Live picture', 'Vintage city'];
const IMAGEREF = 'http://picsum.photos/248/152?r=';
const COST = { MINIM: 150, MAXIM: 2500 };
const ALLDAYS = 7;
const ALLHOURS = 24;
const ALLMINUTES = 60;

const FILTER = {
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

const MODESTYPES = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export {
  TRIPTYPES,
  TYPESLENG,
  POINTSNUMBER,
  ROUTEPOINTS,
  ROUTEPOINTSLENG,
  DESCRIPTIONS,
  DESCRLENG,
  OFFERS,
  OFFERSLENG,
  IMAGEDESCR,
  IMAGEREF,
  COST,
  ALLDAYS,
  ALLHOURS,
  ALLMINUTES,
  FILTER,
  SORT,
  MODESTYPES,
};
