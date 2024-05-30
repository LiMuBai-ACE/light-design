import { Row } from 'antd';
import React, { FC } from 'react';
import './index.less';

interface DragTipsProps {
  /**
   * 是否显示 默认为 false 不显示
   */
  isShow?: boolean;
}

const DragTips: FC<DragTipsProps> = (props) => {
  const { isShow = false } = props;
  if (!isShow) return null;
  return (
    <Row align="middle" justify="center" className="dragtips">
      添加到这里
    </Row>
  );
};
export default DragTips;
