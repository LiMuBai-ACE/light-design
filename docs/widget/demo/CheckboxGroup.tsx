import { CheckboxGroup } from 'light-design';
import React, { useState } from 'react';

const Demo = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleValueChange = (value, res) => {
    console.log('Selected Values:', value);
    console.log('Previous Value:', res.prev);
    console.log('Selected Options:', res.selected);
  };

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2', extra: 'Extra Info' },
    { value: '3', label: 'Option 3' },
  ];

  return (
    <CheckboxGroup
      options={options}
      value={selectedValues}
      onChange={setSelectedValues}
      onValueChange={handleValueChange}
      direction="vertical"
    />
  );
};

export default Demo;
