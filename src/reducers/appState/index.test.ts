import { StateType } from 'hooks/useAppContext/types';

import { DispatchTypes, StateAction } from './types';

import { initialState, reducer } from '.';

let init: StateType;

describe('appStateReducer', () => {
  beforeEach(() => {
    init = initialState;
  });
  it('default action', () => {
    const dispatch: StateAction = {
      type: '',
      payload: [],
    };

    expect(reducer(init, dispatch)).toStrictEqual(init);
  });
  it('change loading', () => {
    const dispatch: StateAction = {
      type: DispatchTypes.SET_LOADING,
      payload: true,
    };

    expect(reducer(init, dispatch)).toStrictEqual({ ...init, loading: true });
  });
});
