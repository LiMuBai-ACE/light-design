import React, { ReactNode, isValidElement } from 'react';
import { Alert as AntAlert, AlertProps, Row } from 'antd';
import { isBoolean } from 'lodash';

import { ClassName, isEmpty } from 'light-design/utils';
import { TextList } from '../paragraph/text';

import './index.less';

type AlertType = 'success' | 'info' | 'warning' | 'error' | 'secondary';
type TextType = 'secondary' | 'success' | 'warning' | 'danger';

const AlertTheme: Record<AlertType, { alert?: AlertProps['type']; text?: TextType; color?: string }> = {
  warning: { alert: 'warning', text: 'warning' },
  success: { alert: 'success', text: 'success' },
  error: { alert: 'error', text: 'danger' },
  info: { alert: 'info', },
  secondary: { text: 'secondary' },
};

interface WarningProps {
  type?: AlertType;
  serial?: boolean;
  inline?: boolean;
  closable?: boolean;
  icon?: boolean | ReactNode;
  content: ReactNode | ReactNode[];
  className?: string;
  style?: AlertProps['style'];
  extra?: ReactNode;
}

export function Warnings(props: WarningProps) {
  let { className, content, extra, icon, inline, type, serial, ...others } = props;

  if (isEmpty(content)) {
    return null;
  }

  type = type || 'info';
  const myicon: ReactNode = isBoolean(icon) ? undefined : icon;

  const theme = {
    alert: AlertTheme[type]?.alert,
    text: AlertTheme[type]?.text,
    color: AlertTheme[type]?.color,
  };

  const css = ClassName.setup({
    warning: true,
    inline: !!inline,
    secondary: theme.text === 'secondary',
    [className as string]: !!className,
  });

  const alert: AlertProps = {
    icon: myicon, // 自定义ICON
    showIcon: !!icon,
    type: theme.alert,
    className: css,
    ...others,
  };

  const text = {
    serial,
    size: 13,

    color: theme.color,
    type: theme.text,
  };

  content = isValidElement(content) ? content : <TextList {...text} content={content} />;

  const node = (
    <Row align="middle" justify="space-between">
      <div>{content}</div>
      {extra}
    </Row>
  );

  return <AntAlert {...alert} message={node} />;
}

interface ExplainProps {
  type?: AlertProps['type'];
  serial?: boolean;
  title?: string | ReactNode;
  icon?: boolean | ReactNode;
  content: ReactNode | ReactNode[];
  className?: string;
  style?: AlertProps['style'];
}

export const Explains = (props: ExplainProps) => {
  const { className, content, icon, serial, style, title, type } = props;
  const theme = AlertTheme[type || 'info'];

  const myicon = isBoolean(icon) ? undefined : icon;

  return (
    <AntAlert
      style={style}
      className={ClassName.poly(["explains", className])}
      showIcon={!!icon}
      icon={myicon}
      type={theme.alert}
      message={title}
      description={<TextList serial={serial} size={13} content={content} />}
    />
  );
};
