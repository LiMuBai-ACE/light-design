import type { SpaceProps } from 'antd';
import { Checkbox, Space, Spin } from 'antd';
import React, { FC, useMemo } from 'react';

import { DefConfig, OptionMethod } from '@/LightForm/constants';
import { KeyMapProps } from '@/LightForm/widgets/interface';
import { Text } from '@/components/paragraph/text';
import { isEmpty, isFunction } from '@/utils';
import type { CheckboxGroupProps } from 'antd/es/checkbox';

export interface LCheckboxGroupProps extends CheckboxGroupProps {
  /**
   * 是否显示加载状态
   */
  loading?: boolean;
  /**
   * 与 props.list 结对出现，定义 option 的映射规则。 如: {value: 'id', label: 'label'}
   */
  keymap?: KeyMapProps;
  /**
   * 多选项排列的方向
   */
  direction?: SpaceProps['direction'];
  /**
   * 自定义监听控件变化的回调
   * @param value 当前选中的值
   * @param res 包含前一个值和选中的选项
   */
  onValueChange?: (
    value: any,
    res: { prev: any; selected: KeyMapProps[] },
  ) => void;
}

// 多选项-keymap模式
const CheckboxGroup: FC<LCheckboxGroupProps> = (props) => {
  const {
    options,
    keymap = DefConfig.keymap,
    direction,
    value,
    onChange,
    onValueChange,
    disabled,
    loading,
    ...others
  } = props;

  const list = useMemo(() => {
    return OptionMethod.options({ keymap, options, disabled });
  }, [options, disabled]);

  const onOptionChange = (val: any[]) => {
    // 处理自定义的监听
    if (isFunction(onValueChange)) {
      const selected = list.filter((ele: KeyMapProps) =>
        (val || []).includes(ele?.value),
      );

      onValueChange(val, { prev: value, selected });
    }

    if (isFunction(onChange)) {
      onChange(val);
    }
  };

  if (loading) {
    return <Spin spinning size="small" style={{ marginLeft: 15 }} />;
  }

  const attr = {
    disabled,
    onChange: onOptionChange,
    ...others,
  };

  if (!isEmpty(value)) {
    Object.assign(attr, { value });
  }

  return (
    <Checkbox.Group {...attr}>
      <Space direction={direction}>
        {list.map((ele) => {
          const ivalue = (ele?.value || ele) as string | number;
          return (
            <Checkbox key={ivalue} value={ivalue}>
              {ele?.extra ? (
                <Space>
                  {ele?.label} <Text type="secondary">{ele?.extra}</Text>
                </Space>
              ) : (
                ele?.label
              )}
            </Checkbox>
          );
        })}
      </Space>
    </Checkbox.Group>
  );
};

export default CheckboxGroup;
