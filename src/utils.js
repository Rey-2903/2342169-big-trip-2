import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { FILTER } from './fish/const';

const getRandomInteger = (beginning, finish) => Math.round(Math.random() * (Math.max(beginning, finish) - Math.min(beginning,finish)) + Math.min(beginning,finish));
const getRandomElement = (i) => i[getRandomInteger(0, i.length - 1)];
const daysHumanize = (date) => dayjs(date).format('D MMMM');
const timeHumanize = (date) => dayjs(date).format('HH:mm');
const dateHumanize = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const parsDate = (dateFrom, dateTo) => dayjs.duration(dayjs(dateTo).diff(dateFrom)).format('DD HH mm').split(' ');
const checkingZerosDays = (days) => days !== '00';
const checkingZerosHours = (hours, days) => hours !== '00' || (hours === '00' && checkingZerosDays(days));
const numIsNull = (begin) => begin === null;

const getTravelPeriod = (dateFrom, dateTo) => {
  const days = parsDate(dateFrom, dateTo)[0];
  const hours = parsDate(dateFrom, dateTo)[1];
  let travelPeriod = `${parsDate(dateFrom, dateTo)[2]}M`;
  if (checkingZerosHours(hours, days)) { travelPeriod = `${hours}H ${travelPeriod}`; }
  if (checkingZerosDays(days)) { travelPeriod = `${days}D ${travelPeriod}`; }

  return travelPeriod;
};

const getEmptyDate = (begin, finish) => {
  if (numIsNull(begin) && numIsNull(finish)) { return 0; }
  if (numIsNull(begin)) { return 1; }
  if (numIsNull(finish)) { return -1; }

  return null;
};

const sortingByDays = (begin, finish) => getEmptyDate(begin.dateFrom, finish.dateFrom) ?? dayjs(begin.dateFrom).diff(dayjs(finish.dateFrom));
const sortingByTime = (begin, finish) => (getEmptyDate(begin.dateFrom, begin.dateTo) && getEmptyDate(finish.dateFrom, finish.dateTo)) ?? dayjs(finish.dateTo).diff(dayjs(finish.dateFrom)) - dayjs(begin.dateTo).diff(dayjs(begin.dateFrom));
const sortingByPrice = (begin, finish) => finish.basePrice - begin.basePrice;
const getOffersByType = (offers, type) => offers.find((offer) => offer.type === type);

const getNewElement = (el, newEl) => {
  const ind = el.findIndex((item) => item.id === newEl.id);
  if (ind === -1) { return el; }

  return [...el.slice(0, ind), newEl, ...el.slice(ind + 1),];
};

const filteringEvents = {
  [FILTER.EVERYTHING]: (events) => Array.from(events),
  [FILTER.FUTURE]: (events) => Array.from(events).filter((event) => dayjs(event.dateFrom).isAfter(dayjs())),
  [FILTER.PAST]: (events) => Array.from(events).filter((event) => dayjs(event.dateFrom).isBefore(dayjs()))
};

const isNull = (prevEventComp, prevEditingEvent) => prevEventComp === null || prevEditingEvent === null;
const isZero = (reliableOffers, allOffers) => allOffers.length === 0 || reliableOffers.length === 0;
const checkingInput = (i) => i.target.tagName === 'INPUT';
const slice = (i) => i.target.id.slice(-1);

export {
  getRandomInteger,
  getRandomElement,
  daysHumanize,
  timeHumanize,
  dateHumanize,
  parsDate,
  checkingZerosDays,
  checkingZerosHours,
  numIsNull,
  getTravelPeriod,
  getEmptyDate,
  sortingByDays,
  sortingByTime,
  sortingByPrice,
  getNewElement,
  getOffersByType,
  isNull,
  isZero,
  checkingInput,
  slice,
  filteringEvents,
};
