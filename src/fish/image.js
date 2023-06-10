import { getRandomElement, getRandomInteger } from '../utils.js';
import { IMAGE_DISCRIPTIONS, ImageInf } from './const.js';

export const generatePictures = () => {
  const isPictures = Boolean(getRandomInteger(0,1));
  if (!isPictures) { return null; }
  const res = Array.from({length: ImageInf.COUNT}, () => ({
    'src': `http://picsum.photos/248/152?r=${getRandomInteger(0, ImageInf.SRC)}`,
    'description': getRandomElement(IMAGE_DISCRIPTIONS),
  }));

  return res;
};
