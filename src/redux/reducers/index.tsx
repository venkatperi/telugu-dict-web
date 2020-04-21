import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { IReducerStates } from '../../schemas/ReducerStates';
import dict from './dictionary';

export default (history: History) =>
  combineReducers<IReducerStates>({
    dict,
    router: connectRouter(history)
  });
