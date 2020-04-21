import { Dispatch } from 'redux';

export const FETCH_DICT_REQUEST = 'fetch_dict_request';
export const FETCH_DICT_SUCCESS = 'fetch_dict_success';
export const FETCH_DICT_FAILURE = 'fetch_dict_failure';

export type DispatchFetchDict = () => (dispatch: Dispatch) => Promise<void>;

export const fetchDict: DispatchFetchDict = () => async dispatch =>
  new Promise(
    (resolve, reject): void => {
      dispatch({
        type: FETCH_DICT_REQUEST,
        payload: { resolve, reject }
      });
    }
  );
