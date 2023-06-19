import ApiService from './framework/api-service.js';
import { HTTP_METHOD } from './fish/const';

export default class Api extends ApiService {
  get points() { return this._load({url: 'points'}).then(ApiService.parseResponse); }
  get offers() { return this._load({url: 'offers'}).then(ApiService.parseResponse); }
  get destinations() { return this._load({url: 'destinations'}).then(ApiService.parseResponse); }

  updatePoint = async (point) => {
    const answer = await this._load({
      url: `points/${point.id}`,
      method: HTTP_METHOD.PUT,
      body: JSON.stringify(this.#adapterServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(answer);
  };

  addPoint = async (point) => {
    const answer = await this._load({
      url: 'points',
      method: HTTP_METHOD.POST,
      body: JSON.stringify(this.#adapterServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(answer);
  };

  deletePoint = async (point) => {
    const answer = await this._load({
      url: `points/${point.id}`,
      method: HTTP_METHOD.DELETE,
    });
    return answer;
  };

  #adapterServer = (ev) => {
    const transformation = {
      ...ev,
      'base_price': ev.basePrice,
      'date_from': ev.dateFrom instanceof Date
        ? ev.dateFrom.toISOString()
        : null,
      'date_to': ev.dateTo instanceof Date
        ? ev.dateTo.toISOString()
        : null,
      'is_favorite': ev.isFavourite,
    };
    delete transformation.basePrice;
    delete transformation.dateFrom;
    delete transformation.dateTo;
    delete transformation.isFavourite;
    return transformation;
  };
}
