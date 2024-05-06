import { InputDiscount } from 'light-design';
import React from 'react';

const InputDiscountDemo: React.FC = () => {
  const onChange = (value) => {
    console.log('value', value);
  };

  return <InputDiscount onChange={onChange} />;
};

export default InputDiscountDemo;
