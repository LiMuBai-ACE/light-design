import MonthDateOptions from '@/utils/calendar';
import type { CascaderProps } from 'antd';
import { Cascader } from 'antd';
import React from 'react';

interface MyProps extends Omit<CascaderProps, 'value'> {
  value?: any[];
  width?: number | string;
}

export default function MonthDatePicker(props: MyProps) {
  const { width = '100%', ...others } = props;
  return (
    <Cascader
      style={{ width }} //
      options={MonthDateOptions}
      placeholder="月-日"
      {...(others as CascaderProps)}
    />
  );
}
