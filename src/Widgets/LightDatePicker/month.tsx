import MonthDateOptions from '@/utils/calendar';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import React, { FC } from 'react';

export interface LightMonthDatePickerProps
  extends Omit<CascaderProps, 'value'> {
  value?: any[];
  width?: number | string;
}

const LightMonthDatePicker: FC<LightMonthDatePickerProps> = (props) => {
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
export default LightMonthDatePicker;
