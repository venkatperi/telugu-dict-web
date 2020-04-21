import { DictionaryList } from '@components/DictionaryList';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'antd';
import { fetchDict } from '@redux/actions';
import Header from '@layout/header';
import lunr from 'lunr';

import './Home.less';
import { DictionaryEntry } from '../../schemas/DictionaryEntry';
import { IReducerStates } from '../../schemas/ReducerStates';

const { Search } = Input;

type Props = {};

const Home: React.FC<Props> = () => {
  const { t } = useTranslation('homeScreen');
  const [fetching, setFetching] = useState(true);
  const list = useSelector((state: IReducerStates) => state.dict);
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState<lunr.Index>();
  const [visibleData, setVisibleData] = React.useState<DictionaryEntry[]>([]);


  useEffect(() => {
    (async () => {
      await setFetching(true);

      try {
        await dispatch(fetchDict());
      } catch (error) {
        console.log(error);
      }

      setFetching(false);
    })();
  }, [dispatch]);


  useEffect(() => {
    setVisibleData(list);
    setIndex(
      lunr(function() {
        this.ref('index');
        this.field('word');
        this.field('plural');
        this.field('oblique');
        this.field('meaning');
        list.forEach((x, i) => this.add({ ...x, index: i }));
      })
    );
  }, [list]);


  function doSearch(str: string) {
    const items = index?.search(str) ?? [];
    if (items.length === 0) {
      setVisibleData(str.length === 0 ? list : []);
    } else {
      const res = items.map(x => list[parseInt(x.ref, 10)]);
      setVisibleData(res);
    }
  }

  return (
    <>
      <Header />
      <Search placeholder="search"
              style={{ width: 250, margin: '10px 20px' }}
              onChange={e => doSearch(e.target.value)}
              allowClear={true} />
      <div className="home">
        <DictionaryList entries={visibleData} />
      </div>
    </>
  );
};

export default Home;
