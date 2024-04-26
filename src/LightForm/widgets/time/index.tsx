import { QuestionCircleOutlined } from '@ant-design/icons';
import { Row, TimePicker, Tooltip } from 'antd';
import React from 'react';

import { TextList } from '@/components/paragraph/text';
import { TimeFormat } from '@/utils';
import { DateInstance } from '../interface';

export const LightTimePicker = (props: any) => {
  const {
    disabled,
    format = TimeFormat.common, //
    width,
    style,
    tips,
    value,
    onChange,
    ...others
  } = props;

  const attrs = {
    format,
    disabled,
    style: { width, ...style },
    // value: value && moment(value, format),
    // defaultValue: value && moment(value, format),
    defaultValue: value,
    onChange: (_mominst: DateInstance, newval: string) => {
      onChange(newval);
    },
    ...others,
  };

  return (
    <Row align="middle" gutter={[8, 0]}>
      <TimePicker {...attrs} />
      {tips && (
        <Tooltip title={<TextList serial content={tips} />}>
          <QuestionCircleOutlined />
        </Tooltip>
      )}
    </Row>
  );
};

/**
 * 选择器-时间区间
 * */
export const LightTimeRange = (props: any) => {
  const {
    style,
    width = '100%',
    format = TimeFormat.common,
    disabled = false,
    value,
    onChange,

    ...others
  } = props;

  const attrs = {
    format,
    disabled,
    style: { width, ...style },
    value,
    defaultValue: value,
    onChange: (inst: DateInstance[], newval: string[]) => {
      onChange(newval);
    },
    ...others,
  };

  return <TimePicker.RangePicker {...attrs} />;
};
