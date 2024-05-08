import { InputNumber } from 'antd';
import React, { FC } from 'react';

import { NumExtend } from '@/utils';
import { InputNumberProps } from 'antd/es';

const LightNumberWidget: FC<InputNumberProps> = (props) => {
  const {
    max,
    min,
    width = '100%',
    style,
    controls = false,
    ...others
  } = props;

  const attrs = {
    controls,
    min: min || 0, // InputNumber的下限
    max: max || Number.MAX_SAFE_INTEGER, // InputNumber的上限
    style: { width, ...style },
    placeholder: '请输入',
    ...others,
  };

  return <InputNumber {...attrs} />;
};

// 输入框-货币
export const LightInputCurrency: FC<InputNumberProps> = (props) => {
  const { placeholder } = props;
  const attrs = {
    placeholder: placeholder || '请输入金额',
    formatter: NumExtend.currency,
  };
  return <LightNumberWidget {...props} {...attrs} />;
};

// 输入框-折扣
export const LightInputDiscount: FC<InputNumberProps> = (props) => {
  const { placeholder } = props;

  const attrs = {
    max: 9.99,
    min: 0.01,
    placeholder: placeholder || '请输入折扣',
    formatter: NumExtend.discount,
  };
  return <LightNumberWidget {...props} {...attrs} />;
};

// 输入框-自然数
export const LightInputCounter: FC<InputNumberProps> = (props) => {
  const { placeholder } = props;

  const attrs = {
    min: 1,
    placeholder: placeholder || '请输入数字',
    formatter: NumExtend.counter,
  };

  return <LightNumberWidget {...props} {...attrs} />;
};

export default LightNumberWidget;
