import { DatePicker as AntDatePicker } from 'antd';

import { isEmpty, TimeExtend } from '@/utils';

import { DateInstance, TimeFormat } from '@/utils/time';
import { DatePickerProps } from 'antd/es';
import React, { FC } from 'react';
import LightMonthDatePicker from './month';
import LightDateRangePicker from './range';

export { LightDateRangePicker, LightMonthDatePicker };

export interface LightDatePickerProps
  extends Omit<DatePickerProps, 'value' | 'onChange'> {
  value?: undefined | DateInstance;
  onChange?: (value: string | undefined) => void;
}

/**
 * 选择器-日期控件 待调试
 * */
const LightDatePicker: FC<LightDatePickerProps> = (props) => {
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

  const attr = {
    onChange: onPickerChange as any,
    format: formatter,
    style: { width, ...style },
    showTime: showTime || isDefaultFormatter,
    ...others,
  };

  if (!isEmpty(initials)) {
    Object.assign(attr, {
      value: initials as DateInstance,
    });
  }

  return <AntDatePicker {...attr} />;
};

export default LightDatePicker;
