import { Input, Row, Switch } from 'antd';
import React from 'react';

import { WidgetType } from './constants';

import LightCascaderPicker from '@/Widgets/LightCascaderPicker'; // 级联控件
import LightCheckboxGroup from '@/Widgets/LightCheckboxGroup'; // 控件集合-多选项
import LightColorPicker from '@/Widgets/LightColorPicker'; // 颜色控件
import LightDatePicker, {
  LightDateRangePicker,
  LightMonthDatePicker,
} from '@/Widgets/LightDatePicker'; // 控件集合-日期

import LightRadioGroup from '@/Widgets/LightRadioGroup'; // 控件集合-单选项
import {
  LightTimePicker,
  LightTimeRangePicker,
} from '@/Widgets/LightTimePicker'; // 控件集合-时间

import LightSelectPicker, {
  LightSelectPickerProps,
} from '@/Widgets/LightSelectPicker'; // 控件集合-下拉列表

import NumberWidget, {
  LightInputCounter,
  LightInputCurrency,
  LightInputDiscount,
} from '@/Widgets/LightInputNumber';

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
      return <LightColorPicker {...others} />;

    // 下拉列表: KeyMap模式
    case WidgetType.select: {
      return <LightSelectPicker {...(others as LightSelectPickerProps)} />;
    }

    // 单选项: KeyMap模式
    case WidgetType.radio: {
      return <LightRadioGroup options={[]} {...others} />;
    }

    // 多选项: KeyMap模式
    case WidgetType.checkbox.keymap: {
      return <LightCheckboxGroup {...others} />;
    }

    // 开关
    case WidgetType.switch: {
      return (
        <Switch checkedChildren="开启" unCheckedChildren="关闭" {...others} />
      );
    }

    // 日期控件
    case WidgetType.date.YMD: {
      return <LightDatePicker {...others} />;
    }

    // 日期区间
    case WidgetType.date.range: {
      return <LightDateRangePicker {...others} />;
    }

    // 时间区间
    case WidgetType.time.HMS: {
      return <LightTimePicker {...others} />;
    }

    // 时间区间
    case WidgetType.time.range: {
      return <LightTimeRangePicker {...others} />;
    }

    // 级联下拉列表: 月-日
    case WidgetType.date.MD: {
      return <LightMonthDatePicker {...others} />;
    }

    // 级联下拉
    case WidgetType.cascader: {
      return <LightCascaderPicker {...others} />;
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
      return <LightInputCurrency {...others} />;
    }

    // 折扣输入框-最多保留两位小数点精度, 且数值最大到9.99
    case WidgetType.discount: {
      return <LightInputDiscount {...others} />;
    }

    // 计数输入框-只能输入正整数
    case WidgetType.counter: {
      return <LightInputCounter {...others} />;
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
