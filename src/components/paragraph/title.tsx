import React, { CSSProperties } from 'react';
import { TitleProps as AntTitleProps } from 'antd/lib/typography/Title';
import { Typography } from 'antd';

const { Title: AntTitle, Paragraph } = Typography;

interface TitleProps extends Omit<AntTitleProps, 'level'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

const BizMapping = {
  size: {
    6: 15,
    7: 14,
    8: 13,
    9: 12,
  } as Record<number, number>,
};

export default function Title(props: TitleProps) {
  const { level, children, style, ...others } = props;

  const css: CSSProperties = {
    marginBottom: 0,
    ...style,
  };

  if (!level || level < 6) {
    const attrs = { level, style: css, ...others } as AntTitleProps;
    return <AntTitle {...attrs}>{children}</AntTitle>;
  }

  Object.assign(css, {
    fontSize: BizMapping.size[level],
    fontWeight: 600, //
  });

  return (
    <Paragraph {...others} style={css}>
      {children}
    </Paragraph>
  );
}
