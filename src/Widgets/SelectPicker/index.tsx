import { Select } from 'antd';
import React, { CSSProperties, FC, useMemo } from 'react';

import { DefConfig, DefOptions, OptionMethod } from '@/LightForm/constants';

import type { SelectProps as AntSelectProps } from 'antd';
export interface LCommonSelectProps
  extends Omit<AntSelectProps, 'options' | 'onChange'> {
  hasAll?: boolean;
  options?: any[];
  onChange: (res: number | string, options: any) => void;
  style: CSSProperties;
  width: number | string;
}

/**
 * @name LightKeymapSelect 下拉列表-Options使用映射模式
 * */
export const LightKeymapSelect: FC<LCommonSelectProps> = (props) => {
  const {
    mode,
    hasAll,
    options = [], // 选项集合-List模式。 如: [{...option1}, {...option2}, ...]
    showSearch = true,

    style,
    placeholder = '请选择',
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

  // 选项集合-List模式
  Object.assign(attrs, { fieldNames, options });

  // 置顶选项-全部
  const list = useMemo(() => {
    return hasAll ? [DefOptions.all, ...options] : options;
  }, [hasAll, options]);

  return <Select {...attrs} options={list} />;
};

/**
 * @name LightSimpleSelect 下拉列表-Options简单选择
 * @description ["苹果","草莓"]
 * */
export const LightSimpleSelect: FC<LCommonSelectProps> = (props) => {
  const {
    mode,
    style,
    hasAll,
    placeholder = '请选择',
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
