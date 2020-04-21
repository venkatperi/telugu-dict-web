import { all } from 'redux-saga/effects';
import listSagas from './list';
import listDictionary from './dictionary';

export default function* rootSaga() {
  yield all([...listSagas, ...listDictionary]);
}
