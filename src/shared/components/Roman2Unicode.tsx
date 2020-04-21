import { roman2unicode, UNICODE_BLOCKS } from '@utils/transliterate';
import { Popover } from 'antd';
import * as React from 'react';

export const Roman2Unicode = (props: { text: string }) => {
  const telugu = roman2unicode(props.text, UNICODE_BLOCKS.telugu);
  return (
    <Popover
      title={telugu}
      content={
        <>
          <div>{props.text}</div>
          <div>{roman2unicode(props.text, UNICODE_BLOCKS.devanagari)}</div>
        </>
      }
    >
      <span>{telugu}</span>
    </Popover>
  );
};
