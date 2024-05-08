import { Select } from 'antd';
import React, { CSSProperties, FC, useMemo } from 'react';

import { DefConfig, DefOptions, OptionMethod } from '@/LightForm/constants';

import { KeyMapProps } from '@/LightForm/widgets/interface';
import type { SelectProps as AntSelectProps } from 'antd';
export interface LightSelectPickerProps
  extends Omit<AntSelectProps, 'options' | 'onChange'> {
  hasAll?: boolean;
  options?: any[];
  onChange: (res: number | string, options: any) => void;
  style: CSSProperties;
  width: number | string;
}

/**
 * @name SelectPicker 下拉列表-Options使用映射模式
 * */
const LightSelectPicker: FC<LightSelectPickerProps> = (props) => {
  const {
    mode,
    hasAll,
    options = [], // 选项集合-List模式。 如: [{...option1}, {...option2}, ...]
    showSearch = true,

    style,
    placeholder = '请选择',
    width = '100%',
    fieldNames = DefConfig.keymap,
    disabled,
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

  let list: any[] = useMemo(() => {
    return OptionMethod.options({
      keymap: fieldNames as KeyMapProps,
      options,
      disabled,
    });
  }, []);

  // 选项集合-List模式
  Object.assign(attrs, { fieldNames, options: list });

  // 置顶选项-全部
  list = useMemo(() => {
    return hasAll ? [DefOptions.all, ...list] : list;
  }, [hasAll, list]);

  return <Select {...attrs} options={list} />;
};
export default LightSelectPicker;
