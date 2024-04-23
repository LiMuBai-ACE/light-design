import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, type ButtonProps } from 'antd';
import React from "react";


import './index.less';

// 导出按钮
export const ExportBtn = (props: { onExport: (params?: any) => void }) => {
  const { onExport } = props;
  return <Button onClick={onExport}>导出</Button>;
};

interface ExpandBtnProps {
  expand: boolean;
  onToggle: () => void;
}

// 折叠板开关
export const ExpanderBtn = ({ expand, onToggle }: ExpandBtnProps) => {

  const ExpanderMaps = [
    // 点击展开
    {
      label: "展开",
      icon: <DownOutlined className="expander" />,
    },
    // 点击收起
    {
      label: "收起",
      icon: <UpOutlined className="expander" />,
    },
  ];

  const attrs: ButtonProps = {
    type: 'link',
    style: { padding: 0 },
    onClick: onToggle,
  };

  const index = Number(expand);

  const { label, icon } = ExpanderMaps[index];

  return (
    <Button {...attrs}>
      {label}
      {icon}
    </Button>
  );
};
