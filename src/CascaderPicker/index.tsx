import { Cascader, CascaderProps } from 'antd';
import React, { FC } from 'react';

interface CustomCascaderProps {
  width?: number | string;
}

export type LDCascaderProps = CustomCascaderProps & CascaderProps;

const CascaderPicker: FC<LDCascaderProps> = (props) => {
  const { width = '100%', style, options, placeholder, ...rest } = props;
  return (
    <Cascader
      options={options}
      placeholder={placeholder}
      style={{ width, ...style }}
      {...rest}
    />
  );
};

export default CascaderPicker;
