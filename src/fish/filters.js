import {filterPoints} from '../utils';

function getFilter(points) {
  return Object.entries(filterPoints).map(
    ([name, filteredPoints]) => ({
      name: name,
      isPoints: filteredPoints(points).length > 0,
    }),
  );
}

export {getFilter};
