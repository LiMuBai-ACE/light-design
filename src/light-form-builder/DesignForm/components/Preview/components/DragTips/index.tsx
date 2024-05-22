import { Row } from 'antd';
import React, { FC } from 'react';
import './index.less';

interface DragTipsProps {
  position?: string;
  direction?: string;
  hidden?: boolean;
}

const DragTips: FC<DragTipsProps> = (props) => {
  const { position = '', direction = '', hidden = true } = props;

  if (hidden || position !== direction) {
    return null;
  }

  return (
    <Row align="middle" justify="center" className="dragtips">
      添加到这里
    </Row>
  );
};
export default DragTips;
