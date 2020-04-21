import { DictionaryEntry } from '../../schemas/DictionaryEntry';

type APIFetchDict = () => Promise<DictionaryEntry[]>;

export const fetchDict: APIFetchDict = async () => {
  try {
    const res = await fetch('https://www.vperi.com/telugu-dict.json', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
    return res.json();
  } catch (e) {
    console.log(e);
  }
};
