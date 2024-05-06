import { KeyMapProps, OptionMethod } from '@/LightForm/widgets/interface';
import { Text } from '@/components/paragraph/text';
import { isFunction } from '@/utils';
import type { RadioGroupProps, SpaceProps } from 'antd';
import { Radio, Space } from 'antd';
import React, { useMemo } from 'react';

interface LRadioGroupProps extends RadioGroupProps {
  keymap?: KeyMapProps;
  direction?: SpaceProps['direction'];
  onValueChange?: (
    value: any,
    res: { prev: any; selected: KeyMapProps },
  ) => void;
  options: { value: number | string; label: string }[];
  disabled?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

export default function RadioGroup(props: LRadioGroupProps) {
  const {
    disabled = false,
    direction = 'horizontal',
    options, // 选项集合-List模式。 如: [{...option1}, {...option2}, ...]
    keymap = { value: 'value', label: 'label' } as KeyMapProps, // 与 props.list 结对出现, 定义 option 的映射规则。 如: {value: 'id', label: 'label'}
    value,
    onChange, // <Ant.Event /> Ant的控件方法, 修改字段值
    onValueChange, // 自定义监听控件变化的回调
    ...others
  } = props;

  const list = useMemo(() => {
    return OptionMethod.options({ keymap, options, disabled });
  }, []);

  const onOptionChange = (ev: any) => {
    const { value: newvalue } = ev.target;
    // 处理自定义的监听
    if (isFunction(onValueChange)) {
      const selected = list.find((ele: KeyMapProps) =>
        (newvalue || []).includes(ele?.value),
      );

      onValueChange(newvalue, { prev: value, selected });
    }

    if (isFunction(onChange)) {
      onChange(newvalue);
    }
  };

  return (
    <Radio.Group
      // value={value}
      disabled={disabled}
      onChange={onOptionChange}
      {...others}
    >
      <Space direction={direction}>
        {list.map((item, index) => (
          <Radio
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            data-index={index}
          >
            <Space>
              {item.label}
              {item?.extra && <Text type="secondary">{item?.extra}</Text>}
            </Space>
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
}
