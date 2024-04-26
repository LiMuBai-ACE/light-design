import { TooltipProps, Typography } from 'antd';
import { EllipsisConfig } from 'antd/es/typography/Base';
import React, { ReactNode } from 'react';

import { ClassName, isEmpty } from 'light-design/utils';

import { useExpand } from './hooks';

import './index.less';

export interface ParagraphProps extends React.HTMLAttributes<HTMLDivElement> {
  href?: string;
  text?: string | ReactNode | TooltipProps; // 文案信息
  expander?: [string, string]; // 基于 ellipsis 设置，在末尾...处展示折叠开关的文案
  inField?: boolean; // 是否允许被复制
  copyable?: boolean; // 是否允许被复制
  ellipsis?: boolean | number; // 超出x行显示省略号, 为 true 时等于1行
}

/**
 * @name  Paragraph
 * @description 关于 text 与 children 的区别
 * @description text 必须是string, 且在 tooltip开启时作为tips的文案
 * @description children 渲染数据面板时优先使用 children, tips使用 text
 * */
export default function Paragraph(props: ParagraphProps) {
  const {
    text,
    className,

    copyable = false, // boolean 是否可复制
    ellipsis, // boolean | number 文案溢出显示省略号
    expander,
    inField,

    style,
    children,
    onClick,
  } = props;

  const expand = useExpand({ initail: !!expander }); // 控制器-展开/收起

  const onExpand = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    expand.action.toggle();
    ev.stopPropagation();
  };

  if (!text && isEmpty(children)) {
    return null;
  }

  const attrs = {
    className: ClassName.setup({
      ['inField']: !!inField,
      [className as string]: !!className,
    }),
    style,
  };

  // 复制功能
  if (copyable) {
    Object.assign(attrs, {
      copyable: { text, tooltips: '复制' },
    });
  }

  // 溢出显示省略号
  if (ellipsis) {
    /* 文本溢出显示省略号 + Tips提示全文 */
    const params: EllipsisConfig = {
      rows: Number(ellipsis) || 1,
      tooltip: !!text && text,
    };

    /* State-开关(展开/收起) */
    if (expander) {
      Object.assign(params, {
        expandable: true,
        symbol: expander[0],
        onExpand,
      } as unknown as EllipsisConfig);
    }

    Object.assign(attrs, { ellipsis: params });
  }

  const onAction = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    onClick && onClick(ev);
  };

  return (
    <Typography.Paragraph key={expand.key} {...attrs} onClick={onAction}>
      {children || (text as ReactNode)}
      {expander?.[1] && ellipsis && !expand.collapsed && (
        <Typography.Link style={{ marginLeft: 8 }} onClick={onExpand}>
          {expander?.[1]}
        </Typography.Link>
      )}
    </Typography.Paragraph>
  );
}
