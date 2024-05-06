import { DownOutlined } from '@ant-design/icons';
import { Select, SelectProps } from 'antd';
import React, { FC, Key } from 'react';

import { ClassName } from '@/utils';

import { Text } from '@/components/paragraph/text';

import './index.less';

const MultipleCounter = (props: any) => {
  const { icon, showCount, value } = props;

  if (showCount) {
    return (
      <Text type="secondary" className="counter">
        {value}
      </Text>
    );
  }

  return icon || <DownOutlined />;
};

export interface LInputWordsProps extends Omit<SelectProps, 'onChange'> {
  maxLength?: number;
  showCount?: boolean;
  onChange?: (words: string[]) => void;
  width?: number | string;
}

const InputWords: FC<LInputWordsProps> = (props) => {
  const {
    className,
    maxLength,
    suffixIcon,
    size,
    showCount,
    onChange,
    width,
    ...others
  } = props;

  const total = others?.value?.length || 0;
  const counter: Key[] = [total];

  if (maxLength) {
    counter.push(maxLength);
  }

  const css = ClassName.setup({
    input: true,
    large: size === 'large',
    [className as string]: !!className,
  });

  const icon = (
    <MultipleCounter
      icon={suffixIcon} //
      showCount={showCount}
      value={counter.join(' / ')}
    />
  );

  return (
    <Select
      allowClear
      mode="tags"
      open={false}
      {...others}
      style={{ width: width || '100%', ...others.style }}
      className={css}
      maxTagTextLength={36}
      suffixIcon={icon}
      onChange={(words) => {
        if (maxLength && (!total || total < maxLength || words?.length < 6)) {
          onChange?.(words);
        }
      }}
    />
  );
};

export default InputWords;
