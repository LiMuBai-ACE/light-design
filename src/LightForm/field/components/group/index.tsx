import { Col, Form, FormListOperation, Row } from 'antd';
import React, { FC, ReactNode, cloneElement, isValidElement } from 'react';

import Card from '@/components/card';
import { AnyJson, isEmpty } from '@/utils';
import LightField from '../..';
import { FieldProps } from '../../type';
import './index.less';

export interface LightGroupProps {
  id?: string;
  name: string;
  value?: AnyJson;
  onChange?: (values: AnyJson) => void;
  observed?: AnyJson;
  widget?: ReactNode;
  /**
   * @name 是否禁用
   * @tips 如果设置 disabled 属性,且 widget 为 groups和json 时,会优先使用field自带的 disabled 属性
   * @tips 如果子级field未设置 disabled,则父级field的 disabled 属性会替代子级的field的 disabled 属性
   */
  disabled?: boolean;
  content?: ReactNode;
  /** 目前仅支持 widget 为 groups和json的情况 */
  fields?: FieldProps[];
  /** 仅支持 widget 为 groups的情况 */
  addRender?: ReactNode;
  /**
   * @tips 仅支持 widget 为 groups的情况
   * @tips 一行显示几个
   */
  columns?: number;
}

/**
 * @name LightGroupContent Array格式的数据
 * @description content模式 自定义组件,需自定义内部list渲染，定制化按钮等
 * @tips 建议使用content模式,这样可以使组件更定制化
 */
export const LightGroupContent: FC<LightGroupProps> = (props) => {
  const { id, name, widget, disabled, ...others } = props;

  const parent = {
    name: (id || '').split('_'),
  };

  return (
    <Form.List name={name}>
      {(rowlist, operation: FormListOperation) => {
        if (isValidElement(widget)) {
          const model = widget?.props as AnyJson;
          const forbidden = !!(model?.disalbed || disabled);

          const attrs = {
            parent, // 父级的字段Name
            rowlist, // Antd.Form.List fields
            operation, // Antd.Form.List operation
            disabled: forbidden, // 禁用状态
            ...others, // 其他属性, 如 value, onChange ....
          };

          return cloneElement(widget, attrs);
        }

        return null;
      }}
    </Form.List>
  );
};

/**
 * @name LightGroupFields Array格式的数据
 * @description fields模式 根据传入的 fields 来渲染
 */
export const LightGroupFields: FC<LightGroupProps> = (props) => {
  const {
    id,
    name,
    fields = [],
    disabled,
    columns,
    addRender,
    value,
    onChange,
  } = props;

  const parent = {
    name: (id || '').split('_'),
  };

  // useEffect(() => {
  //   if (isEmpty(value)) {
  //     onChange?.([{}]);
  //   }
  // }, []);

  return (
    <Form.List name={name}>
      {(rowlist, operation: FormListOperation) => {
        if (isEmpty(fields)) return null;

        return (
          <div className="light-group-fields">
            {rowlist.map((row, index) => {
              const parentName = { name: [...parent.name, index] };
              const newFields = fields.map((field) => ({ ...field, disabled }));
              return (
                <Card key={row.key}>
                  <Row gutter={24}>
                    {newFields.map((field) => (
                      <Col key={field.name} span={columns}>
                        {LightField.insert({ field, row, parent: parentName })}
                      </Col>
                    ))}
                  </Row>
                </Card>
              );
            })}
            {addRender
              ? cloneElement(addRender as any, { onClick: operation.add })
              : null}
          </div>
        );
      }}
    </Form.List>
  );
};
