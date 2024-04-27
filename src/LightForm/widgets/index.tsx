import { Input, Row, Switch } from 'antd';
import React from 'react';

import { DefOptions } from '../constants';
import { WidgetType } from './constants';

import CascaderPicker from '@/CascaderPicker';
import CheckboxGroup from '@/CheckboxGroup'; // 控件集合-多选项
import ColorPicker from '@/ColorPicker';
import DatePicker, { DateRangePicker, MonthDatePicker } from '@/DatePicker'; // 控件集合-日期

import RadioGroup from './radio'; // 控件集合-单选项
import { LightTimePicker, LightTimeRange } from './time'; // 控件集合-时间

import {
  CommonSelectProps,
  LightKeymapSelect,
  LightSimpleSelect,
} from './select'; // 控件集合-下拉列表

import NumberWidget, {
  InputCounter,
  InputCurrency,
  InputDiscount,
} from './number'; // 上传图片

import { Text } from '@/components/paragraph/text';
import { FieldWidgetType } from '../field/type';

const WidgetNode = ({
  widget,
  ...others
}: {
  widget: FieldWidgetType;
  [key: string]: any;
}) => {
  switch (widget) {
    // 隐藏字段
    case WidgetType.hidden:
      return <Input type="hidden" {...others} />;
    // 隐藏字段
    case WidgetType.color:
      return <ColorPicker {...others} />;

    // 下拉列表: KeyMap模式
    case WidgetType.select.keymap: {
      return <LightKeymapSelect {...(others as CommonSelectProps)} />;
    }

    // 下拉列表: Simple模式
    case WidgetType.select.simple: {
      return <LightSimpleSelect {...(others as CommonSelectProps)} />;
    }

    // 单选项: KeyMap模式
    case WidgetType.radio.keymap: {
      return <RadioGroup options={[]} {...others} />;
    }

    // 性别选择: 单选模式
    case WidgetType.gender.radio: {
      return <RadioGroup {...others} options={DefOptions.gender} />;
    }

    // 多选项: KeyMap模式
    case WidgetType.checkbox.keymap: {
      return <CheckboxGroup {...others} />;
    }

    // 开关
    case WidgetType.switch: {
      return (
        <Switch checkedChildren="开启" unCheckedChildren="关闭" {...others} />
      );
    }

    // 日期控件
    case WidgetType.date.YMD: {
      return <DatePicker {...others} />;
    }

    // 日期区间
    case WidgetType.date.range: {
      return <DateRangePicker {...others} />;
    }

    // 时间区间
    case WidgetType.time.HMS: {
      return <LightTimePicker {...others} />;
    }

    // 时间区间
    case WidgetType.time.range: {
      return <LightTimeRange {...others} />;
    }

    // 级联下拉列表: 月-日
    case WidgetType.date.MD: {
      return <MonthDatePicker {...others} />;
    }

    // 级联下拉
    case WidgetType.cascader: {
      return <CascaderPicker {...others} />;
    }

    // 文本域
    case WidgetType.textarea: {
      const { rows, ...attrs } = others;
      return <Input.TextArea rows={rows || 4} {...attrs} />;
    }

    // 数字输入框
    case WidgetType.number: {
      return <NumberWidget {...others} />;
    }

    // 金额输入框-最多保留两位小数点精度
    case WidgetType.currency: {
      return <InputCurrency {...others} />;
    }

    // 折扣输入框-最多保留两位小数点精度, 且数值最大到9.99
    case WidgetType.discount: {
      return <InputDiscount {...others} />;
    }

    // 计数输入框-只能输入正整数
    case WidgetType.counter: {
      return <InputCounter {...others} />;
    }

    default: {
      const { width = '100%', style, ...attrs } = others;

      const wprops = {
        style: { width, ...style },
        ...attrs,
      };

      return <Input allowClear {...wprops} />;
    }
  }
};

export default (props: any) => {
  const { tips, suffix, prefix, widget, readonly, ...others } = props;

  const node = <WidgetNode widget={widget} {...others} />;

  if (suffix || tips) {
    return (
      <Row align="middle" style={{ columnGap: 8 }}>
        {prefix}
        {node}
        {suffix}
        {tips && <Text type="secondary">{tips}</Text>}
      </Row>
    );
  }

  return node;
};
