import MonthDateOptions from '@/utils/calendar';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import React, { FC } from 'react';

interface LDMonthDatePicker extends Omit<CascaderProps, 'value'> {
  value?: any[];
  width?: number | string;
}

const MonthDatePicker: FC<LDMonthDatePicker> = (props) => {
  const { width = '100%', ...others } = props;
  return (
    <Cascader
      style={{ width }} //
      options={MonthDateOptions}
      placeholder="月-日"
      {...(others as CascaderProps)}
    />
  );
};
export default MonthDatePicker;
