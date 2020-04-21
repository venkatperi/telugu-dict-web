import { removeAny } from '@utils/string';
import * as React from 'react';
import { Roman2Unicode } from './Roman2Unicode';

export const ConvertTags = (props: { text: string | object }) => {
  let italics = false;
  let transliterate = false;

  if (!props.text || typeof props.text !== 'string') return <span />;

  let str = props.text.replace(/@1/g, ' @1');
  str = str.replace(/>/g, ' >');

  return (
    <div>
      {str.split(' ').map((x: string, i: number) => {
        if (x.indexOf('1@') >= 0) transliterate = true;
        else if (x.indexOf('@1') >= 0) transliterate = false;

        if (x.indexOf('<') >= 0) italics = true;
        else if (x.indexOf('>') >= 0) italics = false;

        x = removeAny(x, '1@', '@1', '<', '>');
        if (transliterate) {
          return (
            <span key={x + i}>
              <Roman2Unicode text={x} />{' '}
            </span>
          );
        }

        const Tag = italics ? 'i' : 'span';
        return <Tag key={x + i}>{x} </Tag>;
      })}
    </div>
  );
};
