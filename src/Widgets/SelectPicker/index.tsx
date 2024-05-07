import { Select } from 'antd';
import React, { useMemo } from 'react';

import { isEmpty } from '@/utils';

import { DefConfig, DefOptions, OptionMethod } from '@/LightForm/constants';
import { KeymapSelect, MappingSelect, type CommonSelectProps } from './widgets';

export { CommonSelectProps };

/**
 * @name LightKeymapSelect 下拉列表-Options使用映射模式
 * */
export const LightKeymapSelect = (props: CommonSelectProps) => {
  const {
    mode,
    hasAll,
    options, // 选项集合-List模式。 如: [{...option1}, {...option2}, ...]
    mappings = {}, // 选项集合-Maps模式。 如: {[valu1]: label1, [valu2]: label2, ...}
    showSearch = true,

    style,
    placeholder,
    width = '100%',
    fieldNames = DefConfig.keymap,

    value,
    onChange, // <Ant.Event /> Ant的控件方法, 修改字段值

    ...others
  } = props;

  const attrs = {
    mode,
    hasAll,
    placeholder,
    allowClear: true,
    showSearch,
    value,
    style: { width, ...style },
    onChange,
    ...others,
  };

  if (showSearch) {
    Object.assign(attrs, { filterOption: OptionMethod.filter });
  }

  // if (mode === 'multiple') {
  //   Object.assign(attrs, { showArrow: true });
  // }

  // 选项集合-Maps模式
  if (!isEmpty(mappings)) {
    const extend = { mappings, hasAll };
    return <MappingSelect {...attrs} {...extend} />;
  }

  // 选项集合-List模式
  Object.assign(attrs, { fieldNames, options });
  return <KeymapSelect {...attrs} />;
};

export const LightSimpleSelect = (props: CommonSelectProps) => {
  const {
    mode,
    style,
    hasAll,
    placeholder,
    width = '100%',
    options = [], // 选项集合-仅支持List模式

    value,
    onChange, // <Ant.Event /> Ant的控件方法

    ...others
  } = props;

  const list = useMemo(() => {
    const output = options.map((label: string | number) => ({
      value: label,
      label,
    }));

    if (hasAll) {
      output.push(DefOptions.all);
    }

    return output;
  }, [options, hasAll]);

  const onOptionChange = (newval: any, datas: any) => {
    onChange(newval, datas);
  };

  const attrs = {
    mode,
    placeholder,
    allowClear: true,

    options: list,
    defaultValue: value,
    style: { width, ...style },

    onChange: onOptionChange,
    ...others,
  };

  if (mode === 'multiple') {
    Object.assign(attrs, { showArrow: true });
  }

  return <Select {...attrs} />;
};
