import { AnyJson, ClassName, isEmpty } from '@/utils';
import { OptionType } from '@/utils/types';
import React from 'react';

import Paragraph, { ParagraphProps } from '@/components/paragraph';
import { Text } from '@/components/paragraph/text';
import './index.less';

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

const formatValue = (
  params: Pick<
    ReadonlyFieldProps,
    'value' | 'placeholder' | 'mapping' | 'options'
  >,
) => {
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
