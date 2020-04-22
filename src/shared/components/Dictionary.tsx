import { DictItem } from '@components/DictItem';
import { Pagination } from 'antd';
import * as React from 'react';
import { DictionaryEntry } from '../../schemas/DictionaryEntry';

export interface DictProps {
  entries: DictionaryEntry[];
}

const Pager = (props: {
  onChange: (page: number) => void;
  onShowSizeChange: (page: number, pageSize: number) => void;
  showTotal: (total: number) => string;
  pageSize: number;
  dictionaryEntries: DictionaryEntry[];
}) => (
  <Pagination
    style={{ marginTop: 20, marginLeft: 20 }}
    onChange={props.onChange}
    onShowSizeChange={props.onShowSizeChange}
    showTotal={props.showTotal}
    defaultCurrent={1}
    pageSize={props.pageSize}
    total={props.dictionaryEntries.length}
    size="small"
    showQuickJumper={true}
    showSizeChanger={true}
  />
);

export const Dictionary = (props: DictProps) => {
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
      <Pager
        onChange={onPaginationChange}
        onShowSizeChange={onPaginationSizeChange}
        showTotal={total => `${total} entries`}
        pageSize={currentPageSize}
        dictionaryEntries={props.entries}
      />
      <div>
        {entries
          .slice((currentPage - 1) * currentPageSize, currentPage * currentPageSize)
          .map(entry => (
            <DictItem key={entry.word + entry.meaning} entry={entry} />
          ))}
      </div>
      <Pager
        onChange={onPaginationChange}
        onShowSizeChange={onPaginationSizeChange}
        showTotal={total => `${total} entries`}
        pageSize={currentPageSize}
        dictionaryEntries={props.entries}
      />
    </div>
  );
};
