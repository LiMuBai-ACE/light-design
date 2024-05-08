import React from 'react';

import { LightCascaderPicker } from 'light-design';

export default () => {
  interface Option {
    value: string | number;
    label: string;
    children?: Option[];
  }

  const options: Option[] = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];

  const onChange = (value: string[]) => {
    console.log('onChange', value);
  };

  const attr = {
    options,
    onChange,
    placeholder: 'Please select',
  };

  return <LightCascaderPicker {...attr} />;
};
