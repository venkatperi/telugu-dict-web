import { DictionaryEntry } from '../../schemas/DictionaryEntry';
import { FETCH_DICT_SUCCESS } from '../actions';

type Props = {
  type: string;
  payload: DictionaryEntry[];
};

const INITIAL_STATE: DictionaryEntry[] = [];

export default (state = INITIAL_STATE, { type, payload }: Props) => {
  switch (type) {
    case FETCH_DICT_SUCCESS:
      return payload;
    default:
      return state;
  }
};
