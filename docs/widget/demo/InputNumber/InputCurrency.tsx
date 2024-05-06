import { InputCurrency } from 'light-design';
import React from 'react';

const InputCurrencyDemo: React.FC = () => {
  const onChange = (value) => {
    console.log('value', value);
  };

  return <InputCurrency onChange={onChange} />;
};

export default InputCurrencyDemo;
