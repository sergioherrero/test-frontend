// FIXME:  TEST
// import { renderHook } from '@testing-library/react-hooks';

// import useFetch from '.';

// const promiseResult = {};

// const error = new Error('Error');

// const promise = (): Promise<any> =>
//   new Promise((resolve) => {
//     resolve({ data: promiseResult });
//   });

// const promiseError = (): Promise<any> =>
//   new Promise((resolve, reject) => {
//     reject(error);
//   });

// describe('useApiCall Tests', () => {
//   it('useApiCall initialized', async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useFetch(promise));

//     expect(result.current.data).toBeUndefined();
//     expect(result.current.loading).toBeTruthy();

//     await waitForNextUpdate();

//     expect(result.current.loading).toBeFalsy();
//     expect(result.current.data).toBe(promiseResult);
//   });
//   it('useApiCall not initialized', async () => {
//     const { result, waitForNextUpdate } = renderHook(() =>
//       useFetch(promise, { notInitialized: true }),
//     );

//     expect(result.current.data).toBeUndefined();
//     expect(result.current.loading).toBeFalsy();

//     result.current.call();
//     expect(result.current.data).toBeUndefined();
//     expect(result.current.loading).toBeTruthy();

//     await waitForNextUpdate();

//     expect(result.current.data).toBe(promiseResult);
//     expect(result.current.loading).toBeFalsy();
//   });
//   it('useApiCall with error', async () => {
//     const { result, waitForNextUpdate } = renderHook(() => useFetch(promiseError));

//     expect(result.current.error).toBeUndefined();
//     expect(result.current.loading).toBeTruthy();

//     await waitForNextUpdate();

//     expect(result.current.loading).toBeFalsy();
//     expect(result.current.error).toBe(error);
//   });
// });
// TODO: Remove export
export {};
