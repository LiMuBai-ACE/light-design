import { LightInputCurrency } from 'light-design';
import React from 'react';

const Demo: React.FC = () => {
  const onChange = (value) => {
    console.log('value', value);
  };

  return <LightInputCurrency onChange={onChange} />;
};

export default Demo;
