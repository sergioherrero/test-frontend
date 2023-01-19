import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { getToken } from 'config/localStorage';

const StatusCode = {
  Unauthorized: 401,
  Forbidden: 403,
  UnprocessableEntity: 422,
  TooManyRequests: 429,
  InternalServerError: 500,
};

const onFulfilledResponse = (response: AxiosResponse) => response;

const onRejectedResponse = (error: AxiosError) => {
  if (error?.response?.status) {
    if (error.response.status === StatusCode.Unauthorized) {
      // TODO: Handle
    } else if (error.response.status === StatusCode.Forbidden) {
      // TODO: Handle
    } else if (error.response.status === StatusCode.UnprocessableEntity) {
      // TODO: Handle
    } else if (error.response.status === StatusCode.TooManyRequests) {
      // TODO: Handle
    } else if (error.response.status === StatusCode.InternalServerError) {
      // TODO: Handle
    }
  }

  return Promise.reject(error);
};

const initializeAxios = (baseURL: string, token?: string) =>
  axios.create({
    baseURL,
    headers: {
      Authorization: token || getToken() || '',
    },
  });

const axiosInstances: Record<string, AxiosInstance> = {
  config: initializeAxios(`${process.env.REACT_APP_CONFIG_API_URL}`),
  room: initializeAxios(`${process.env.REACT_APP_ROOM_API_URL}`),
};

const requestInterceptor = (config: AxiosRequestConfig) => {
  const token = getToken() || '';
  const newConfig = { ...(config || {}) };

  if (token && config.headers) {
    (config.headers as AxiosHeaders).set('Authorization', token);
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
  return newConfig;
};

const onRejectedRequest = (error: Error) => error;

Object.keys(axiosInstances).forEach((instanceName) => {
  axiosInstances[instanceName].interceptors.request.use(requestInterceptor, onRejectedRequest);
  axiosInstances[instanceName].interceptors.response.use(onFulfilledResponse, onRejectedResponse);
});

export default axiosInstances;
