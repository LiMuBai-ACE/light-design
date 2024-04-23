import { Cascader } from 'antd';
import type { CascaderProps } from 'antd';
import MonthDateOptions from 'light-design/utils/calendar';
import React from "react";


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
