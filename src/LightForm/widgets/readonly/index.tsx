import { OptionType } from 'light-design/utils/types';
import { ClassName, isEmpty, AnyJson } from 'light-design/utils';
import React from 'react';

import './index.less';
import Paragraph, { ParagraphProps } from 'light-design/components/paragraph';
import { Text } from 'light-design/components/paragraph/text';

export interface ReadonlyFieldProps {
  copyable?: ParagraphProps['copyable'];
  ellipsis?: ParagraphProps['ellipsis'];
  className?: ParagraphProps['className'];
  style?: ParagraphProps['style'];
  value?: any;
  placeholder?: any;
  mapping?: AnyJson;
  options?: OptionType[];
}

const formatValue = (params: Pick<ReadonlyFieldProps, 'value' | 'placeholder' | 'mapping' | 'options'>) => {
  const { mapping, options, value, placeholder } = params;

  if (!isEmpty(options)) {
    const selected = (options || []).find((ele) => ele.value === value);
    return selected?.label;
  }

  if (!isEmpty(mapping)) {
    return mapping?.[value] || placeholder || '--';
  }

  if (!value && placeholder) {
    return <Text type="secondary">{placeholder}</Text>;
  }

  return value;
};

export default function ReadonlyField(props: ReadonlyFieldProps) {
  const {
    className,
    style,

    copyable,
    ellipsis = 1,

    mapping,
    options,
    placeholder, //

    value,
  } = props;

  return (
    <Paragraph
      ellipsis={ellipsis}
      copyable={copyable}
      style={style}
      className={ClassName.poly(['paragraph', className])}
      text={formatValue({ mapping, options, value, placeholder }) || ''} //
    />
  );
}
