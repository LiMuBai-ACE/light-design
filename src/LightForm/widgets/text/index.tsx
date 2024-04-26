import { Input, InputProps } from 'antd';
import React, { useRef } from 'react';

import { StrExtend } from '@/utils';

interface MyProps extends Omit<InputProps, 'onChange'> {
  onChange?: (val?: string) => void;
}

export const WrittingInput = (props: MyProps) => {
  const { value, onChange, ...rest } = props;

  const myref = useRef<boolean>();

  const onCompositionStart = () => {
    myref.current = true;
  };

  const onCompositionEnd = (ev: any) => {
    myref.current = false;
    const val = StrExtend.cleaner(ev.target.value);
    if (onChange) {
      onChange(val);
    }
  };

  const onValueChange = (ev: any) => {
    if (myref.current) {
      return;
    }
    const val = StrExtend.cleaner(ev.target.value);
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Input
        allowClear
        value={value}
        onChange={onValueChange}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        {...rest}
      />
      <div>{value as string}</div>
    </div>
  );
};

export default {};
