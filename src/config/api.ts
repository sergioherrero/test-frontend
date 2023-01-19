import { AxiosPromise } from 'axios';

import axiosInstances from './axios';

type ApiType = {
  [key: string]: () => AxiosPromise;
};

const config: ApiType = {
  getConfig: () => axiosInstances.config.get('feature-flag/master'),
};

const room: ApiType = {
  getRooms: () => axiosInstances.room.get('rooms'),
};

const api = {
  config,
  room,
};

export default api;
