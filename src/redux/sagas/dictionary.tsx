import { takeLatest, call, put } from 'redux-saga/effects';
import { DictionaryEntry } from '../../schemas/DictionaryEntry';
import { FETCH_DICT_REQUEST, FETCH_DICT_SUCCESS, FETCH_DICT_FAILURE } from '../actions';
import * as API from '../api';

export default [takeLatest(FETCH_DICT_REQUEST, fetchDictionary)];

type FetchDictEntry = {
  type: string;
  payload: {
    resolve: (list: DictionaryEntry[]) => void;
    reject: (error: string) => void;
  };
};

function* fetchDictionary({ payload: { resolve, reject } }: FetchDictEntry) {
  try {
    const list: DictionaryEntry[] = yield call(API.fetchDict);

    resolve(list);

    yield put({ type: FETCH_DICT_SUCCESS, payload: list });
  } catch (error) {
    reject(error);

    yield put({ type: FETCH_DICT_FAILURE, payload: error });
  }
}
