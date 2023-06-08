import { getRandomNumber } from '../utils.js';
import dayjs from 'dayjs';

export const getDate = (day1 = dayjs()) =>{
  const allDays = 7;
  const allHours = 24;
  const allMinutes = 60;

  const gapD = getRandomNumber(0, allDays);
  const gapH = getRandomNumber(0, allHours);
  const gapM = getRandomNumber(0, allMinutes);

  return dayjs(day1).add(gapD, 'day').add(gapH, 'hour').add(gapM, 'minute').toDate();
};
