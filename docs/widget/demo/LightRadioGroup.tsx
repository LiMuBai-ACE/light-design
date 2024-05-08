import { LightRadioGroup } from 'light-design';
import React from 'react';

const Demo = () => {
  const handleValueChange = (value, res) => {
    console.log('Selected Values:', value);
    console.log('Previous Value:', res.prev);
    console.log('Selected Options:', res.selected);
  };

  const onChange = (value) => {
    console.log('value', value);
  };
  // const options = [
  //   { value: '1', label: 'Option 1' },
  //   { value: '2', label: 'Option 2', extra: 'Extra Info' },
  //   { value: '3', label: 'Option 3' },
  // ];

  const options = ['苹果', '香蕉', '橘子'];

  return (
    <LightRadioGroup
      options={options}
      onChange={onChange}
      onValueChange={handleValueChange}
      direction="horizontal"
    />
  );
};

export default Demo;
