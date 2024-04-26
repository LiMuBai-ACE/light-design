import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import { TextProps } from 'antd/es/typography/Text';
import React, { ReactNode, useState } from 'react';

import { ClassName, isEmpty, StrExtend } from 'light-design/utils';

import './index.less';

interface SerialTextProps extends Omit<TextProps, 'type'> {
  block?: boolean;
  inField?: boolean;
  serial?: ReactNode;
  color?: string;
  size?: 'default' | 'mini' | 'small' | number;
  type?: TextProps['type'] | 'info' | 'default';
}

// Color-物流: rgb(204, 102, 0)
export const Text = (props: SerialTextProps) => {
  const {
    block,
    inField,
    type,
    children,
    color,
    serial,
    size,
    className,
    style = {},
    onClick,
    ...others
  } = props;

  const isInfoTheme = type === 'info';
  const isDefTheme = !type || ['info', 'default'].includes(type);

  const attrs = {
    style,
    className: ClassName.setup({
      small: size === 'small',
      mini: size === 'mini',
      inField: !!inField,
      info: !!isInfoTheme,
      [className as string]: !!className,
    }),
    ...others,
  };

  if (!isDefTheme) {
    Object.assign(attrs, { type });
  }

  if (block) {
    Object.assign(attrs.style, { display: 'block' });
  }

  if (color) {
    Object.assign(attrs.style, { color });
  }

  if (typeof size === 'number') {
    Object.assign(attrs.style, { fontSize: size });
  }

  const content = (
    <Typography.Text {...attrs} onClick={onClick}>
      {children}
    </Typography.Text>
  );

  if (!serial) {
    return content;
  }

  return (
    <Space align="start" size={5} onClick={onClick}>
      <Typography.Text {...attrs}>{serial}</Typography.Text>
      <Typography.Text {...attrs}>{children}</Typography.Text>
    </Space>
  );
};

export const TextList = (props: {
  serial?: boolean;
  type?: SerialTextProps['type'];
  size?: SerialTextProps['size'];
  color?: string;
  inField?: boolean;
  content: ReactNode | ReactNode[];
}): any => {
  const { content, color, inField, serial, type, size } = props;

  const attrs = { block: true, inField, type, color, size };

  if (Array.isArray(content)) {
    return content.map((ele: ReactNode, index: number) => {
      const num = serial ? `${index + 1}.` : '';
      return (
        <Text key={index} serial={num} {...attrs}>
          {ele}
        </Text>
      );
    });
  }

  return <Text {...attrs}>{content}</Text>;
};

export const TextRemark = (props: {
  title: any;
  content: any;
  type?: SerialTextProps['type'];
}) => {
  const { title, content } = props;

  const empty = isEmpty(content);

  if (!title && empty) {
    return null;
  }

  const type = props?.type || 'secondary';

  return (
    <div style={{ marginTop: 6 }}>
      {!!title && (
        <Text size={13} type={type}>
          {title}
        </Text>
      )}
      {!empty && <TextList serial size={13} type={type} content={content} />}
    </div>
  );
};

export const EncryptText = (props: { text?: string }) => {
  const { text } = props;

  const [encrpt, setEncrpt] = useState(true);

  const onToggle = () => {
    setEncrpt(!encrpt);
  };

  if (!text) {
    return '--';
  }

  const attrs = {
    style: { marginLeft: 12 },
    onClick: onToggle,
  };

  if (encrpt) {
    return (
      <>
        {StrExtend.mask(text, 'mobile')}
        <EyeOutlined {...attrs} />
      </>
    );
  }

  return (
    <>
      {text}
      <EyeInvisibleOutlined {...attrs} />
    </>
  );
};
