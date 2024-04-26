import { DatePicker as AntDatePicker } from 'antd';
import React, { useMemo } from 'react';

import { isEmpty, isFunction, TimeExtend, TimeFormat } from '@/utils';

import { RangePickerProps } from 'antd/es/date-picker';
import { DateType } from '../interface';

interface MyProps extends Omit<RangePickerProps, 'value' | 'onChange'> {
  value?: DateType[];
  showTime?: boolean;
  width?: number | string;
  onChange?: (range?: string[]) => void;
}

export type EventValue<DateType> = DateType | null;
export type RangeValue<DateType> =
  | [EventValue<DateType>, EventValue<DateType>]
  | null;

/* 选择器-日期区间 */
export default function DateRange(props: MyProps) {
  const {
    width = '100%',
    style,
    format,
    showTime,
    value,
    onChange, // <Ant.Event /> Ant的控件方法, 修改字段值
    ...others
  } = props;

  const formatter = format || TimeFormat.common;
  const isDefaultFormatter = formatter === TimeFormat.common;

  const onPickerChange = (
    res: RangeValue<DateType>,
    range: [string, string],
  ) => {
    if (isFunction(onChange)) {
      onChange?.(isEmpty(range) ? undefined : range);
    }
  };

  const initials = useMemo(() => {
    return (value || []).map((ele: DateType) => {
      return TimeExtend.instance(ele);
    });
  }, [value]);

  return (
    <AntDatePicker.RangePicker
      value={initials as RangeValue<any>}
      onChange={onPickerChange}
      format={formatter}
      style={{ width, ...style }}
      showTime={showTime || isDefaultFormatter}
      {...others}
    />
  );
}
