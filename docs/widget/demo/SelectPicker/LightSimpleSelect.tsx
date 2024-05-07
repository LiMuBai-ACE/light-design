import React from 'react';

import { LightSimpleSelect } from 'light-design';

const Demo: React.FC = () => {
  const onChange = (selectedValue, selectedOptions) => {
    console.log('Selected Value:', selectedValue);
    console.log('Selected Options:', selectedOptions);
  };

  const attrs = {
    mode: 'multiple',
    options: ['Apple', 'Banana', 'Orange'],
    showSearch: true,
    onChange,
  };

  return <LightSimpleSelect {...attrs} />;
};

export default Demo;
