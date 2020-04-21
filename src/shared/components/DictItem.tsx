import { ConvertTags } from '@components/ConvertTags';
import { Roman2Unicode } from '@components/Roman2Unicode';
import * as React from 'react';
import { DictionaryEntry } from '../../schemas/DictionaryEntry';

export const DictItem = (props: { entry: DictionaryEntry }) => (
  <div
    style={{
      padding: '20px',
      borderBottom: 'solid 1px #eee',
      background: '#fff'
    }}
  >
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
      ) : null}{' '}
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
