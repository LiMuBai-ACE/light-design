import { LightDatePicker } from 'light-design';
import React from 'react';

const Demo: React.FC = () => {
  const handleDateChange = (date: string | undefined) => {
    console.log('date', date);
  };

  return <LightDatePicker onChange={handleDateChange} />;
};

export default Demo;
