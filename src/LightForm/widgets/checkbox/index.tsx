import type { SpaceProps } from 'antd';
import { Checkbox, Spin } from 'antd';
import React, { useMemo } from 'react';

import type { CheckboxGroupProps as AntCheckboxGroupProps } from 'antd/lib/checkbox';
import { isFunction } from 'light-design/utils';
import { OptionMethod } from './constants';
import { KeyMapProps } from 'light-design/LightForm/type';
import { DefConfig } from 'light-design/LightForm/constants';


interface MyProps extends AntCheckboxGroupProps {
  loading?: boolean;
  keymap?: KeyMapProps;
  mappings?: Record<string, string>;
  direction?: SpaceProps['direction'];
  onValueChange?: (
    value: any,
    res: { prev: any; selected: KeyMapProps[] },
  ) => void;
}

// 多选项-keymap模式
export default function CheckboxGroup(props: MyProps) {
  const {
    options, // 选项集合-List模式。 如: [{...option1}, {...option2}, ...]
    keymap = DefConfig.keymap, // 与 props.list 结对出现, 定义 option 的映射规则。 如: {value: 'id', label: 'label'}

    mappings = {}, // 选项集合-Maps模式。 如: {[valu1]: label1, [valu2]: label2, ...}

    value,
    onChange, // <Ant.Event /> Ant的控件方法, 修改字段值
    onValueChange, // 自定义监听控件变化的回调

    disabled,
    loading,

    ...others
  } = props;

  const list = useMemo(() => {
    return OptionMethod.options({ keymap, options, mappings, disabled });
  }, [options, mappings, disabled]);

  const onOptionChange = (val: any[]) => {
    if (isFunction(onChange)) {
      onChange(val);
    }

    // 处理自定义的监听
    if (isFunction(onValueChange)) {
      const selected = list.filter((ele: KeyMapProps) =>
        (val || []).includes(ele?.value),
      );

      onValueChange(val, { prev: value, selected });
    }
  };

  if (loading) {
    return <Spin spinning size="small" style={{ marginLeft: 15 }} />;
  }

  return (
    <Checkbox.Group
      disabled={disabled}
      defaultValue={value}
      onChange={onOptionChange}
      {...others}
    >
      {list.map((ele) => {
        const ivalue = (ele?.value || ele) as string | number;
        return (
          <Checkbox key={ivalue} value={ivalue}>
            {ele?.label}
          </Checkbox>
        );
      })}
    </Checkbox.Group>
  );
}
