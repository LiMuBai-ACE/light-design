import { Button } from 'antd';
import { ColorPicker } from 'light-design';
import React, { useState } from 'react';

const Demo: React.FC = () => {
  const [color, setColor] = useState<string>('#ff0000');

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    console.log('newColor', newColor);
  };

  return (
    <ColorPicker
      widgetRender={<Button>选择颜色</Button>}
      onChange={handleColorChange}
      value={color}
    />
  );
};

export default Demo;
