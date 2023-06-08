import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const getRandomNumber = (beginning, finish) => {
  beginning = Math.min(beginning,finish);
  finish = Math.max(beginning, finish);
  return Math.round(Math.random() * (finish - beginning) + beginning);
};

const getRandomElement = (el) => {
  const randomIndex = getRandomNumber(0, el.length - 1);
  return el[randomIndex];
};

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


export {getRandomNumber, getRandomElement, humanizeDay, humanizeTime, humanizeDate, getRoutePeriod};
