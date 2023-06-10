import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {FiltersTypes} from './fish/const';

dayjs.extend(duration);

const humanizeDay = (date) => dayjs(date).format('D MMMM');

const humanizeTime = (date) => dayjs(date).format('HH:mm');

const humanizeDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const getRoutePeriod = (dateFrom, dateTo) => {
  const timeParts = dayjs.duration(dayjs(dateTo).diff(dateFrom)).format('DD HH mm').split(' ');
  const days = timeParts[0];
  const hours = timeParts[1];
  let minutes = `${timeParts[2]}M`;

  if (hours !== '00' || (hours === '00' && days !== '00')) { minutes = `${hours}H ${minutes}`; }
  if (days !== '00' ) { minutes = `${days}D ${minutes}`; }

  return minutes;
};

const getRandomInteger = (beginning, finish) => {
  beginning = Math.min(beginning,finish);
  finish = Math.max(beginning, finish);
  return Math.round(Math.random() * (finish - beginning) + beginning);
};

const getRandomElement = (el) => {
  const randomIndex = getRandomInteger(0, el.length - 1);
  return el[randomIndex];
};

const pastFilter = (point) => dayjs(point.dateFrom).isBefore(dayjs());

const futureFilter = (point) => dayjs(point.dateFrom).isAfter(dayjs());

const filterPoints = {
  [FiltersTypes.EVERYTHING]: (points) => Array.from(points),
  [FiltersTypes.FUTURE]: (points) => Array.from(points).filter((point) => futureFilter(point)),
  [FiltersTypes.PAST]: (points) => Array.from(points).filter((point) => pastFilter(point))
};

const getEmptyDate = (d1, d2) => {
  if (d1 === null && d2 === null) {
    return 0;
  }
  if (d2 === null) {
    return -1;
  }
  if (d1 === null) {
    return 1;
  }
  return null;
};

const getPeriod = (p1, p2) => {
  const per1 = getEmptyDate(p1.dateFrom, p1.dateTo);
  const per2 = getEmptyDate(p2.dateFrom, p2.dateTo);
  const res = per1 && per2;

  return res;
};

const isNull = (routePoint, editingRoutePoint) => routePoint === null || editingRoutePoint === null;

export {isNull, filterPoints, pastFilter, futureFilter, getRandomInteger, getRandomElement, humanizeDay, humanizeTime, humanizeDate, getRoutePeriod, getEmptyDate, getPeriod};
