import { getRandomElement, getRandomNumber } from '../utils.js';
import { IMAGE_DISCRIPTIONS, ImageInf } from './const.js';

const getImage = () => ({
  'src': `http://picsum.photos/248/152?r=${getRandomNumber(0, ImageInf.SRC)}`,
  'description': getRandomElement(IMAGE_DISCRIPTIONS),
});

export const generatePictures = () => {
  const isPictures = Boolean(getRandomNumber(0,1));
  if (!isPictures) { return null; }

  return Array.from({length: ImageInf.COUNT}, getImage);
};
