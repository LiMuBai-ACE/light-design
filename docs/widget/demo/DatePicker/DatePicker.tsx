import { DatePicker } from 'light-design';
import React from 'react';

const Demo: React.FC = () => {
  const handleDateChange = (date: string | undefined) => {
    console.log('date', date);
  };

  return <DatePicker onChange={handleDateChange} />;
};

export default Demo;
