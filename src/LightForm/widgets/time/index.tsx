import { TimePicker, Row, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';

import { TimeFormat } from 'light-design/utils';
import { DateInstance } from '../interface';
import { TextList } from 'light-design/components/paragraph/text';

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
