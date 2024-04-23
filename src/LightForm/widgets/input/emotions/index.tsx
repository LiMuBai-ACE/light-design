import { Input, InputProps, InputRef, Space } from 'antd';


import { WxEmotions } from './widgets';
import React, { useRef } from 'react';
import { AnyJson, StrExtend, sleep } from 'light-design/utils';

export * from './widgets';

export const EmotionsInput = (
  props: InputProps & {
    emotions?: any[];
  },
) => {
  const { emotions, ...others } = props;

  const inputRef = useRef<InputRef>(null);
  const posRef = useRef<AnyJson>({});

  const { value, onChange } = others;

  return (
    <Space >
      <Input
        allowClear
        ref={inputRef}
        {...others}
        style={{ width: 420 }}
        onBlur={(ev) => {
          const { selectionStart } = ev?.target as HTMLInputElement;
          Object.assign(posRef.current, { selectionStart });
        }}
      />
      <WxEmotions
        onCheck={async (res) => {
          let pos = posRef.current?.selectionStart as number;

          const insert = res?.label || '';

          const current = StrExtend.insert({
            origin: value as string,
            insert,
            pos,
          });

          onChange?.(current as any);

          await sleep(10);
          pos = pos + insert?.length || 0;
          inputRef?.current?.setSelectionRange(pos, pos, 'forward');
          inputRef?.current?.focus?.();
        }}
      />
    </Space>
  );
};
