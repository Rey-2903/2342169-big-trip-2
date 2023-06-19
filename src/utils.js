import { FILTERS } from './fish/const.js';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

const getOffersByType = (offers, type) => offers.find((offer) => offer.type === type);
const bigLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const daysHumanize = (date) => dayjs(date).format('D MMMM');
const timeHumanize = (date) => dayjs(date).format('HH:mm');
const dateHumanize = (date) => dayjs(date).format('DD/MM/YY HH:mm');
const checkingZerosDays = (days) => days !== '00';
const checkingZerosHours = (hours, days) => hours !== '00' || (hours === '00' && checkingZerosDays(days));
const numIsNull = (num) => num === null;
const notNumNull = (num) => num !== null;
const isInput = (num) => num === 'INPUT';
const isNotInput = (num) => num !== 'INPUT';
const isZero = (begin, finish) => begin === 0 || finish === 0;
const zeroNum = (num) => num === 0;
const isNull = (pastEventComp, pastEditingEvent) => pastEventComp === null || pastEditingEvent === null;
const slice = (i) => i.target.id.slice(-1);

const getTravelPeriod = (dateFrom, dateTo) => {
  const timeParts = dayjs.duration(dayjs(dateTo).diff(dateFrom)).format('DD HH mm').split(' ');
  const days = timeParts[0];
  const hours = timeParts[1];
  let eventDuration = `${timeParts[2]}M`;
  if (checkingZerosHours(hours, days)) { eventDuration = `${hours}H ${eventDuration}`; }
  if (checkingZerosDays(days)) { eventDuration = `${days}D ${eventDuration}`; }
  return eventDuration;
};

const getEmptyDate = (begin, finish) => {
  if (numIsNull(begin) && numIsNull(finish)) { return 0; }
  if (numIsNull(begin)) { return 1; }
  if (numIsNull(finish)) { return -1; }
  return null;
};

const getEmptyPeriod = (begin, finish) => getEmptyDate(begin.dateFrom, begin.dateTo) && getEmptyDate(finish.dateFrom, finish.dateTo);
const sortingByDays = (begin, finish) => getEmptyDate(begin.dateFrom, finish.dateFrom) ?? dayjs(begin.dateFrom).diff(dayjs(finish.dateFrom));
const sortingByTime = (begin, finish) => getEmptyPeriod(begin, finish) ?? dayjs(finish.dateTo).diff(dayjs(finish.dateFrom)) - dayjs(begin.dateTo).diff(dayjs(begin.dateFrom));
const sortingByPrice = (begin, finish) => finish.basePrice - begin.basePrice;
const isDate = (begin, finish) => dayjs(begin).isSame(finish, 'D');

const filteringEvents = {
  [FILTERS.EVERYTHING]: (points) => points === null ? [] : Array.from(points),
  [FILTERS.FUTURE]: (points) => points === null ? [] : Array.from(points).filter((point) => dayjs(point.dateFrom).isAfter(dayjs())
    || dayjs(point.dateFrom).isSame(dayjs(), 'D')
    || dayjs(point.dateFrom).isBefore(dayjs()) && dayjs(point.dateTo).isAfter(dayjs())),
  [FILTERS.PAST]: (points) => points === null ? [] : Array.from(points).filter((point) => dayjs(point.dateTo).isBefore(dayjs())
    || dayjs(point.dateFrom).isBefore(dayjs())
    && dayjs(point.dateTo).isAfter(dayjs()))
};

export {
  daysHumanize,
  timeHumanize,
  dateHumanize,
  getTravelPeriod,
  isDate,
  getEmptyDate,
  sortingByDays,
  sortingByTime,
  sortingByPrice,
  getOffersByType,
  bigLetter,
  numIsNull,
  notNumNull,
  isZero,
  isInput,
  isNotInput,
  zeroNum,
  isNull,
  slice,
  filteringEvents
};

