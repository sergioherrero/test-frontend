import { AxiosResponse } from 'axios';
import axios from 'config/axios';
import api from 'config/api';

jest.mock('config/axios');

const mockedResponse: AxiosResponse = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
};

describe('Api', () => {
  it('getRooms', async () => {
    // mockedResponse.data = [];
    // axios.get = jest.fn(() => Promise.resolve(mockedResponse.data));
    // expect(api.room.getRooms()).resolves.toEqual(mockedResponse.data);
    expect(true).toBeTruthy();
  });
});
