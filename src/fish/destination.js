import { getRandomElement } from '../utils.js';
import { DESCRIPTIONS, DESTINATIONS } from './const.js';
import { generatePictures } from './image.js';

export const getDestination = (id) => ({
  'id': id,
  'description': getRandomElement(DESCRIPTIONS),
  'name': DESTINATIONS[id],
  'pictures': generatePictures(),
});
