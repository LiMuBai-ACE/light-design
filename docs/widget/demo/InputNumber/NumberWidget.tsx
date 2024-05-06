import { NumberWidget } from 'light-design';
import React from 'react';

const NumberWidgetDemo: React.FC = () => {
  const onChange = (value) => {
    console.log('value', value);
  };

  return <NumberWidget onChange={onChange} />;
};

export default NumberWidgetDemo;
