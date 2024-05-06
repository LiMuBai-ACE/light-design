import { MonthDatePicker } from 'light-design';
import React from 'react';

const Demo: React.FC = () => {
  const onChange = (value: any) => {
    const [month, day] = value;
    console.log(`month: ${month}月, day: ${day}日`);
  };

  return <MonthDatePicker onChange={onChange} />;
};

export default Demo;
