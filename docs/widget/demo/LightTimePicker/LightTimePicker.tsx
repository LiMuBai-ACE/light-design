import { LightTimePicker } from 'light-design';
import React from 'react';

const Demo = () => {
  const handleTimeChange = (newTime: string) => {
    console.log('Selected time:', newTime);
  };

  return <LightTimePicker onChange={handleTimeChange} />;
};

export default Demo;
