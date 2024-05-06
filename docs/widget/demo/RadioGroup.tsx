import { RadioGroup } from 'light-design';
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
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2', extra: 'Extra Info' },
    { value: '3', label: 'Option 3' },
  ];

  return (
    <RadioGroup
      options={options}
      onChange={onChange}
      onValueChange={handleValueChange}
      direction="horizontal"
    />
  );
};

export default Demo;
