import { all } from 'redux-saga/effects';
import listDictionary from './dictionary';

export default function* rootSaga() {
  yield all([...listDictionary]);
}
