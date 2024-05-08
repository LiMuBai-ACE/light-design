import React from 'react';

import { LightInputWords } from 'light-design';

const Demo: React.FC = () => {
  const onChange = (value) => {
    console.log(value);
  };
  return <LightInputWords onChange={onChange} />;
};

export default Demo;
