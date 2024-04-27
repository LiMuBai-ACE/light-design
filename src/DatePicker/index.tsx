import { DatePicker as AntDatePicker } from 'antd';

import { isEmpty, TimeExtend } from '@/utils';

import { DateInstance, TimeFormat } from '@/utils/time';
import { DatePickerProps } from 'antd/es';
import React, { FC } from 'react';
import MonthDatePicker from './month';
import DateRangePicker from './range';

export { DateRangePicker, MonthDatePicker };

export interface LDDatePickerProps
  extends Omit<DatePickerProps, 'value' | 'onChange'> {
  value?: undefined | DateInstance;
  onChange?: (value: string | undefined) => void;
}

/**
 * 选择器-日期控件 待调试
 * */
const DatePicker: FC<LDDatePickerProps> = (props) => {
  const {
    style,
    width = '100%',
    format,
    showTime,
    value,
    onChange,
    ...others
  } = props;

  const formatter = format || TimeFormat.common;
  const isDefaultFormatter = formatter === TimeFormat.common;

  const onPickerChange = (res: DateInstance, fomatted: string) => {
    onChange?.(isEmpty(fomatted) ? undefined : fomatted);
  };

  const initials = isEmpty(value) ? value : TimeExtend.instance(value);

  return (
    <AntDatePicker
      format={formatter}
      value={initials}
      onChange={onPickerChange as any}
      style={{ width, ...style }}
      showTime={showTime || isDefaultFormatter}
      {...others}
    />
  );
};

export default DatePicker;
