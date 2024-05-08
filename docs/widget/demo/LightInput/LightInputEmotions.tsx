import { LightInputEmotions } from 'light-design';
import React from 'react';

const Demo: React.FC = () => {
  const onChange = (value) => {
    console.log(value);
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <LightInputEmotions onChange={onChange} />
    </div>
  );
};

export default Demo;
