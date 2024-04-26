import { DatePicker as AntDatePicker } from 'antd';

import { isEmpty, TimeExtend } from '@/utils';

import { TimeFormat } from '@/utils/time';
import React, { useMemo } from 'react';
import MonthDatePicker from './month';
import DateRange from './range';

export { DateRange, MonthDatePicker };

/**
 * 选择器-日期控件 待调试
 * */
export default function DatePicker(props: any) {
  const {
    style,
    width = '100%',
    format,
    showTime,
    value,
    rules,
    onChange,
    ...others
  } = props;

  const formatter = format || TimeFormat.common;
  const isDefaultFormatter = formatter === TimeFormat.common;

  const onPickerChange = (res: any, fomatted: string) => {
    onChange?.(isEmpty(fomatted) ? undefined : fomatted);
  };

  const initials = isEmpty(value) ? value : TimeExtend.instance(value);

  const invalidate = useMemo(
    () => TimeExtend.instance().subtract(1, 'days').endOf('day'),
    [],
  );

  if (rules?.includes?.('later')) {
    Object.assign(others, {
      disabledDate: (current: any) => {
        return current && current < invalidate;
      },
    });
  }

  return (
    <AntDatePicker
      format={formatter}
      value={initials}
      onChange={onPickerChange}
      style={{ width, ...style }}
      showTime={showTime || isDefaultFormatter}
      {...others}
    />
  );
}
