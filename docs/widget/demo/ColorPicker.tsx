import { Button } from 'antd';
import { ColorPicker } from 'light-design';
import React from 'react';

const Demo: React.FC = () => {
  const handleColorChange = (newColor: string) => {
    console.log('newColor', newColor);
  };

  return (
    <ColorPicker
      widgetRender={<Button>选择颜色</Button>}
      onChange={handleColorChange}
    />
  );
};

export default Demo;
