import React, { FC, ReactNode, cloneElement, isValidElement } from 'react';

import Card from '@/components/card';
import { AnyJson, isEmpty } from '@/utils';
import { Col, Row } from 'antd';
import LightField from '../..';
import { FieldProps } from '../../type';

export interface LightJsonProps {
  id?: string;
  name: string;
  observed?: AnyJson;
  onChange?: (values: AnyJson) => void;
  widget?: ReactNode;
  /**
   * @name 是否禁用
   * @tips 如果设置 disabled 属性,且 widget 为 groups和json 时,会优先使用field自带的 disabled 属性
   * @tips 如果子级field未设置 disabled,则父级field的 disabled 属性会替代子级的field的 disabled 属性
   */
  disabled?: boolean;
  /** 目前仅支持 widget 为 groups和json的情况 */
  fields?: FieldProps[];
  /**
   * @tips 仅支持 widget 为 groups的情况
   * @tips 一行显示几个
   */
  columns?: number;
}

/** @name JsonWidget JSON格式的数据 */
export const LightJsonWidget: FC<LightJsonProps> = (props: any) => {
  const { id, widget, disabled, ...others } = props;

  const namepath = (id || '').split('_');

  const parent = { name: namepath };

  if (isValidElement(widget)) {
    const model = widget?.props as AnyJson;
    const forbidden = !!(model?.disalbed || disabled);
    const attrs = { id, parent, disabled: forbidden, ...others };
    return cloneElement(widget, attrs);
  }

  return null;
};

/**
 * @name LightGroupFields Array格式的数据
 * @description fields模式 根据传入的 fields 来渲染
 */
export const LightJsonFields: FC<LightJsonProps> = (props) => {
  const { id, fields = [], disabled, columns } = props;

  const namepath = (id || '').split('_');

  const parent = { name: namepath };

  if (isEmpty(fields)) return null;

  const newFields = fields.map((field) => ({ ...field, disabled }));

  return (
    <Card>
      <Row gutter={24}>
        {newFields.map((field) => (
          <Col key={field.name} span={columns}>
            {LightField.insert({ field, parent })}
          </Col>
        ))}
      </Row>
    </Card>
  );
};
