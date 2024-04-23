import type { ColorPickerProps } from 'antd';
import type { Color } from 'antd/lib/color-picker';
import React from 'react';

import { ColorPicker as AntColorPicker } from 'antd';
import { DefSettings } from 'light-design/config/constants';


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

  return <AntColorPicker showText {...config} value={value} onChange={onValueChange} />;
}
