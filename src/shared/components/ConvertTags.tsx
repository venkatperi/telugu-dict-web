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
      {str.split(' ').map((word: string, index: number) => {
        if (word.indexOf('1@') >= 0) transliterate = true;
        else if (word.indexOf('@1') >= 0) transliterate = false;

        if (word.indexOf('<') >= 0) italics = true;
        else if (word.indexOf('>') >= 0) italics = false;

        // tslint:disable-next-line:no-parameter-reassignment
        word = removeAny(word, '1@', '@1', '<', '>');
        if (transliterate) {
          return (
            <span key={word + index}>
              <Roman2Unicode text={word} />{' '}
            </span>
          );
        }

        const Tag = italics ? 'i' : 'span';
        return <Tag key={word + index}>{word} </Tag>;
      })}
    </div>
  );
};
