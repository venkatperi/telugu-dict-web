import { Pagination } from 'antd';
import * as React from 'react';
import { DictionaryEntry } from '../../schemas/DictionaryEntry';
import { ConvertTags } from './ConvertTags';
import { Roman2Unicode } from './Roman2Unicode';

export interface DictProps {
  entries: DictionaryEntry[];
}

const DictItem = (props: { entry: DictionaryEntry }) => (
  <div style={{ padding: '20px', borderBottom: 'solid 1px #eee', background: '#fff' }}>
    <div>
      <span style={{ fontSize: 26, fontWeight: 200, paddingRight: 10 }}>
        <Roman2Unicode text={props.entry.word} />
      </span>
      <span>{props.entry.grammaticalCategory}</span> &nbsp;
      {props.entry.genderCategory ? (
        <span>
          <i>GC.&nbsp;</i>
          {props.entry.genderCategory}
        </span>
      ) : null}
    </div>
    <div>
      {props.entry.plural ? (
        <span>
          <i>Pl.&nbsp;</i>
          <Roman2Unicode text={props.entry.plural} />
          &nbsp;
        </span>
      ) : null}
      {props.entry.oblique ? (
        <span>
          <i>Obl.&nbsp;</i>
          <Roman2Unicode text={props.entry.oblique} />
        </span>
      ) : null}
    </div>
    <ConvertTags text={props.entry.meaning} />
  </div>
);

export const DictionaryList = (props: DictProps) => {
  const [entries, setEntries] = React.useState<DictionaryEntry[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [currentPageSize, setCurrentPageSize] = React.useState(50);

  React.useEffect(() => {
    setEntries(props.entries);
    setCurrentPage(1);
  }, [props]);

  function onPaginationChange(page: number) {
    setCurrentPage(page);
  }

  function onPaginationSizeChange(page: number, pageSize: number) {
    setCurrentPageSize(pageSize);
  }

  return (
    <div>
      <Pagination
        style={{ float: 'right', display: 'block' }}
        onChange={onPaginationChange}
        onShowSizeChange={onPaginationSizeChange}
        showTotal={total => `${total} entries`}
        defaultCurrent={1}
        pageSize={currentPageSize}
        total={props.entries.length}
        showQuickJumper={true}
        showSizeChanger={true}
      />
      {entries
        .slice((currentPage - 1) * currentPageSize, currentPage * currentPageSize)
        .map(entry => (
          <DictItem key={entry.word + entry.meaning} entry={entry} />
        ))}
    </div>
  );
};
