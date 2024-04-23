import { Input, Cascader, Switch, Row } from 'antd';
import React from 'react';

import { WidgetType } from './constants';
import { DefOptions } from '../constants';

import RadioGroup from './radio'; // 控件集合-单选项
import CheckboxGroup from './checkbox'; // 控件集合-多选项
import DatePicker, { DateRange, MonthDatePicker } from './date'; // 控件集合-日期
import { LightTimePicker, LightTimeRange } from './time'; // 控件集合-时间

import { LightKeymapSelect, LightSimpleSelect, CommonSelectProps } from './select'; // 控件集合-下拉列表


import NumberWidget, { InputCurrency, InputDiscount, InputCounter } from './number'; // 上传图片

import ColorPicker from './color';
import { Text } from 'light-design/components/paragraph/text';

const WidgetNode = ({ widget, ...others }: { widget: string;[key: string]: any }) => {
  switch (widget) {
    // 隐藏字段
    case WidgetType.hidden:
      // return <span style={{ display: 'none' }} />;
      return <Input type="hidden" {...others} />;

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
      return <Switch checkedChildren="开启" unCheckedChildren="关闭" {...others} />;
    }

    // 日期控件
    case WidgetType.date.YMD: {
      return <DatePicker {...others} />;
    }

    // 日期区间
    case WidgetType.date.range: {
      return <DateRange {...others} />;
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
    case WidgetType.cascader.radio: {
      const { width = '100%', style, options, placeholder, ...rest } = others;
      return (
        <Cascader
          options={options} //
          placeholder={placeholder}
          style={{ width, ...style }}
          {...rest}
        />
      );
    }

    // 搜索框
    case WidgetType.search:
      return <Input allowClear {...others} autoComplete="off" />;

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


    // // 上传文件-上传文件
    // case WidgetType.upload.file: {
    //   return <UploadWidget {...(others as any)} />;
    // }

    // // 上传文件-上传图片|视频
    // case WidgetType.album: {
    //   return <UploadWidget mode="media" {...(others as any)} />;
    // }

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

  // if (widget === WidgetType.album) {
  //   const attrs = { tips, suffix, prefix };
  //   return <ImageUploader {...others} {...attrs} />;
  // }

  const node = <WidgetNode widget={widget} {...others} />;

  // const isNumber = widget === WidgetType.number;

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
