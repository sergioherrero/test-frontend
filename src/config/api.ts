import axios from 'config/axios';

type ApiType = {
  [key: string]: () => string;
};

const config: ApiType = {
  getConfig: () => '8888/fleature-flag/master',
};

const room: ApiType = {
  getRooms: () => 'rooms',
};

const api = {
  config,
  room,
};

export default api;
