import React from 'react';

import { InputWords } from 'light-design';

const Demo: React.FC = () => {
  const onChange = (value) => {
    console.log(value);
  };
  return <InputWords onChange={onChange} />;
};

export default Demo;
