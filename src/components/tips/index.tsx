import {
  QuestionCircleFilled,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { Space, Tooltip, TooltipProps } from 'antd';

import { isEmpty } from '@/utils';
import React, { ReactNode } from 'react';
import './index.less';

const TipIcon = {
  fill: <QuestionCircleFilled />,
  outline: <QuestionCircleOutlined />,
};

export const QuestionTips = (
  props: TooltipProps & { icon?: ReactNode; theme?: 'fill' | 'outline' },
) => {
  const { icon, theme = 'fill', children, className, style, ...others } = props;

  const empty = isEmpty(children);

  const iconNode = <div className="icon">{icon || TipIcon[theme]}</div>;

  return (
    <Tooltip {...others}>
      {empty ? (
        iconNode
      ) : (
        <Space align="center">
          {children}
          {iconNode}
        </Space>
      )}
    </Tooltip>
  );
};
