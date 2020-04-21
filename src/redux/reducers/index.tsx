import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { IReducerStates } from '../../schemas/ReducerStates';
import list from './list';
import dict from './dictionary';

export default (history: History) =>
  combineReducers<IReducerStates>({
    list,
    dict,
    router: connectRouter(history)
  });
