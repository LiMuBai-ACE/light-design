import { Form, FormListOperation, Space } from 'antd';
import React, { cloneElement, isValidElement } from 'react';

import { AnyJson, isEmpty } from '@/utils';
import LightField from '..';
import { FieldParentProps, FieldProps } from '../type';

/**
 * @name LightGroupContent Array格式的数据
 * @description content模式 自定义组件,需自定义内部list渲染，定制化按钮等
 */
export function LightGroupContent(props: any) {
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
}

/**
 * @name LightGroupFields Array格式的数据
 * @description fields模式 根据传入的 fields 来渲染
 */
export function LightGroupFields(props: any) {
  const { id, name, fields = [], disabled, ...others } = props;

  const parent = {
    name: (id || '').split('_'),
  };

  return (
    <Form.List name={name}>
      {(rowlist, operation: FormListOperation) => {
        if (isEmpty(fields)) {
          const forbidden = !!disabled;

          const attrs = {
            parent, // 父级的字段Name
            // rowlist, // Antd.Form.List fields
            // operation, // Antd.Form.List operation
            disabled: forbidden, // 禁用状态
            ...others, // 其他属性, 如 value, onChange ....
          };

          const ListField = rowlist.map((row, index) => {
            const newFields = fields.map((itemField: FieldProps) => ({
              ...itemField,
              rowIndex: index,
            }));

            const newParent = {
              name: [...(parent as FieldParentProps).name, index],
            };

            return (
              <Space key={row.key}>
                {LightField.each({
                  fields: newFields,
                  row,
                  parent: newParent,
                })}
              </Space>
            );
          });
          return (
            <div className="Light-group-fields">
              {ListField}
              <Space>
                {/* <Button type="primary" onClick={operation.add}>添加</Button>
                <Button type="primary" onClick={operation.remove}>删除</Button> */}
              </Space>
            </div>
          );
        }

        return null;
      }}
    </Form.List>
  );
}
