import dayjs from 'dayjs';

const MINUTES = 60;
const ALL_MINUTES_IN_DAY = 1440;
const DATE = 'YYYY-MM-DD';
const D_TIME = 'DD/MM/YY hh:mm';
const TIME = 'hh:mm';

const humanizePointDueDate = (date) => dayjs(date).format('DD MMM');

const getDate = (date) => dayjs(date).format(DATE);

const getTime = (date) => dayjs(date).format(TIME);

const getDateTime = (date) => dayjs(date).format(D_TIME);

const duration = (dateFrom, dateTo) => {
  const beginning = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const minutes = end.diff(beginning, 'minute');
  const days = end.diff(beginning, 'days');

  const hours = Math.floor((minutes - days * ALL_MINUTES_IN_DAY) / MINUTES);
  const minute = minutes - (days * ALL_MINUTES_IN_DAY + hours * MINUTES);

  const dayForm = (days) ? `${days}D` : '';
  const hourForm = (hours) ? `${hours}H` : '';
  const minuteForm = (minute) ? `${minute}M` : '';

  return `${dayForm} ${hourForm} ${minuteForm}`;
};

const getRandomInteger = (a = 0, b = 1) => {
  const minim = Math.min(a, b);
  const lowerBorder = Math.ceil(minim);
  const maxim = Math.max(a, b);
  const upperBorder = Math.floor(maxim);
  const res = lowerBorder + Math.random() * (upperBorder - lowerBorder + 1);

  return Math.floor(res);
};

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

export { getRandomInteger, getRandomElement, humanizePointDueDate, duration, getDate, getDateTime, getTime };

