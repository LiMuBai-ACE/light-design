import type { ColorPickerProps } from 'antd';
import type { Color } from 'antd/es/color-picker';
import React from 'react';

import { DefSettings } from '@/config/constants';
import { ColorPicker as AntColorPicker } from 'antd';

interface MyProps extends Omit<ColorPickerProps, 'value' | 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
}

const config = DefSettings['color-picker'];

export default function ColorPicker(props: MyProps) {
  const { value, onChange } = props;

  const onValueChange = (color: Color, val: string) => {
    onChange?.(val);
  };

  return (
    <AntColorPicker
      showText
      {...config}
      value={value}
      onChange={onValueChange}
    />
  );
}
