import { DatePicker as AntDatePicker } from 'antd';
import React, { FC, useMemo } from 'react';

import { isEmpty, isFunction, TimeExtend, TimeFormat } from '@/utils';

import { RangePickerProps } from 'antd/es/date-picker';
import { DateType } from '../LightForm/widgets/interface';

export interface LDateRangePickerProps
  extends Omit<RangePickerProps, 'value' | 'onChange'> {
  value?: DateType[];
  showTime?: boolean;
  width?: number | string;
  onChange?: (range?: string[]) => void;
}

type EventValue<DateType> = DateType | null;
type RangeValue<DateType> = [EventValue<DateType>, EventValue<DateType>] | null;

/* 选择器-日期区间 */
const DateRangePicker: FC<LDateRangePickerProps> = (props) => {
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

  const attr = {
    onChange: onPickerChange,
    format: formatter,
    style: { width, ...style },
    showTime: showTime || isDefaultFormatter,
    ...others,
  };

  if (!isEmpty(initials)) {
    Object.assign(attr, {
      value: initials as RangeValue<any>,
    });
  }

  return <AntDatePicker.RangePicker {...attr} />;
};

export default DateRangePicker;
