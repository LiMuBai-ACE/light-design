import { Button } from 'antd';
import { LightColorPicker } from 'light-design';
import React from 'react';

const Demo: React.FC = () => {
  const handleColorChange = (newColor: string) => {
    console.log('newColor', newColor);
  };

  return (
    <LightColorPicker
      widgetRender={<Button>选择颜色</Button>}
      onChange={handleColorChange}
    />
  );
};

export default Demo;
