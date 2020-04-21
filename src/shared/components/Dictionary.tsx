import { DictItem } from '@components/DictItem';
import { Pagination } from 'antd';
import * as React from 'react';
import { DictionaryEntry } from '../../schemas/DictionaryEntry';

export interface DictProps {
  entries: DictionaryEntry[];
}

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
      <Pagination
        style={{ float: 'right', display: 'block' }}
        onChange={onPaginationChange}
        onShowSizeChange={onPaginationSizeChange}
        showTotal={total => `${total} entries`}
        defaultCurrent={1}
        pageSize={currentPageSize}
        total={props.entries.length}
        size="small"
        showQuickJumper={true}
        showSizeChanger={true}
      />
      <div>
        {entries
          .slice((currentPage - 1) * currentPageSize, currentPage * currentPageSize)
          .map(entry => (
            <DictItem key={entry.word + entry.meaning} entry={entry} />
          ))}
      </div>
    </div>
  );
};
