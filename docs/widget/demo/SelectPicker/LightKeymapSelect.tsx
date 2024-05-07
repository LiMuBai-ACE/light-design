import React from 'react';

import { LightKeymapSelect } from 'light-design';

const Demo: React.FC = () => {
  const onChange = (selectedValue, selectedOptions) => {
    console.log('Selected Value:', selectedValue);
    console.log('Selected Options:', selectedOptions);
  };

  const attrs = {
    mode: 'multiple',
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    showSearch: true,
    onChange,
  };

  return <LightKeymapSelect {...attrs} />;
};

export default Demo;
