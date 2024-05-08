import { LightDateRangePicker } from 'light-design';
import React from 'react';

const Demo: React.FC = () => {
  const handleDateRangeChange = (range: string[] | undefined) => {
    console.log('Selected date range:', range);
    // Add your custom logic here
  };

  return <LightDateRangePicker onChange={handleDateRangeChange} />;
};

export default Demo;
