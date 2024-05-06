import { InputCounter } from 'light-design';
import React from 'react';

const InputCounterDemo: React.FC = () => {
  const onChange = (value) => {
    console.log('value', value);
  };
  return <InputCounter onChange={onChange} />;
};

export default InputCounterDemo;
