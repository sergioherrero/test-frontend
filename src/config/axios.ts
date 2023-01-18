import axios, { AxiosError, AxiosHeaders, AxiosRequestConfig, AxiosResponse } from 'axios';

import { getToken } from 'config/localStorage';

const StatusCode = {
  Unauthorized: 401,
  Forbidden: 403,
  UnprocessableEntity: 422,
  TooManyRequests: 429,
  InternalServerError: 500,
};

const onFulfilledResponse = (response: AxiosResponse) => {
  return response;
};

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

const initializeAxios = (token?: string) =>
  axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: token || getToken() || '',
    },
  });

const axiosInstance = initializeAxios();

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken() || '';
    const newConfig = { ...(config || {}) };

    if (token && config.headers) {
      (config.headers as AxiosHeaders).set('Authorization', token);
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
    return newConfig;
  },
  (error: Error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(onFulfilledResponse, onRejectedResponse);

export default axiosInstance;
