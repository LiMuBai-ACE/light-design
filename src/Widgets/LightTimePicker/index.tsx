import { TimePicker } from 'antd';
import React, { FC } from 'react';

import { DateInstance, TimeFormat } from '@/utils';
import { TimePickerProps, TimeRangePickerProps } from 'antd/es';

export interface LightTimePickerProps
  extends Omit<TimePickerProps, 'value' | 'onChange'> {
  disabled?: boolean;
  format?: string;
  width?: number | string;
  style?: React.CSSProperties;
  value?: DateInstance;
  onChange?: (newval: string) => void;
  [key: string]: any;
}

export const LightTimePicker: FC<LightTimePickerProps> = (props) => {
  const {
    disabled,
    format = TimeFormat.hms,
    width = '100%',
    style,
    value,
    onChange,
    ...others
  } = props;

  const attrs = {
    format,
    disabled,
    style: { width, ...style },
    value: value as DateInstance,
    onChange: (_mominst: DateInstance, newval: string | string[]) => {
      onChange?.(newval as string);
    },
    ...others,
  };

  return <TimePicker {...attrs} />;
};

export interface LightTimeRangePickerProps
  extends Omit<TimeRangePickerProps, 'value' | 'onChange' | 'defaultValue'> {
  disabled?: boolean;
  format?: string;
  width?: number | string;
  style?: React.CSSProperties;
  tips?: string | string[];
  value?: DateInstance[];
  defaultValue?: [DateInstance, DateInstance];
  onChange?: (newval: string | string[]) => void;
  [key: string]: any;
}

/**
 * 选择器-时间区间
 * */
export const LightTimeRangePicker: FC<LightTimeRangePickerProps> = (props) => {
  const {
    style,
    width = '100%',
    format = TimeFormat.hms,
    disabled = false,
    value,
    onChange,

    ...others
  } = props;

  const attrs = {
    format,
    disabled,
    style: { width, ...style },
    value: value as [start: DateInstance, end: DateInstance],
    onChange: (inst: any, newval: string[]) => {
      onChange?.(newval);
    },
    ...others,
  };

  return <TimePicker.RangePicker {...attrs} />;
};
