import { Cascader, CascaderProps } from 'antd';
import React, { FC } from 'react';

interface CustomCascaderProps {
  width?: number | string;
}

export type MyCascaderProps = CustomCascaderProps & CascaderProps;

const CascaderPicker: FC<MyCascaderProps> = (props) => {
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
