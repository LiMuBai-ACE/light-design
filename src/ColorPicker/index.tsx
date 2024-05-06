import type { ColorPickerProps } from 'antd';
import type { Color } from 'antd/es/color-picker';
import React, { FC, ReactNode } from 'react';

import { ColorPicker as AntColorPicker } from 'antd';

export interface LColorPickerProps
  extends Omit<ColorPickerProps, 'value' | 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  widgetRender?: ReactNode;
}

const ColorPicker: FC<LColorPickerProps> = (props) => {
  const { value, onChange, widgetRender } = props;

  const onValueChange = (color: Color, val: string) => {
    onChange?.(val);
  };

  return (
    <AntColorPicker showText value={value} onChange={onValueChange}>
      {widgetRender}
    </AntColorPicker>
  );
};

export default ColorPicker;
