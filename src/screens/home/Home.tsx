import { Dictionary } from '@components/Dictionary';
import Footer from '@layout/footer';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Affix, Input, Spin } from 'antd';
import { fetchDict } from '@redux/actions';
import Header from '@layout/header';
import lunr from 'lunr';

import './Home.less';
import { DictionaryEntry } from '../../schemas/DictionaryEntry';
import { IReducerStates } from '../../schemas/ReducerStates';

const { Search } = Input;

type Props = {};

const Home: React.FC<Props> = () => {
  const [fetching, setFetching] = useState(true);
  const list = useSelector((state: IReducerStates) => state.dict);
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState<lunr.Index>();
  const [visibleData, setVisibleData] = React.useState<DictionaryEntry[]>([]);


  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchDict());
      } catch (error) {
        console.log(error);
      }

    })();
  }, [dispatch]);


  useEffect(() => {
    if (list.length === 0) return;
    setVisibleData(list);
    setIndex(
      lunr(function() {
        this.ref('index');
        this.field('meaning');
        list.forEach((x, i) => this.add({ ...x, index: i }));
        setFetching(false);
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

  if (fetching) {
    return (
      <div style={{
        position: 'absolute', margin: 'auto', top: 0, left: 0, right: 0,
        bottom: 0, height: 50, width: 50
      }}>
        <Spin size={'large'} style={{ width: 50, height: 50 }} />
      </div>);
  }

  return (
    <div style={{ maxWidth: 800, width: '100vw', margin: '0 auto' }}>
      <Affix offsetTop={0}>
        <div style={{ background: '#fff', paddingBottom: 10 }}>
          <Header />
          <Search placeholder="search"
                  style={{ width: 250, margin: '0 20px', fontSize: '1.5em' }}
                  onChange={e => doSearch(e.target.value)}
                  allowClear={true} />
        </div>
      </Affix>
      <Dictionary entries={visibleData} />
      <Footer />
    </div>
  );
};

export default Home;
