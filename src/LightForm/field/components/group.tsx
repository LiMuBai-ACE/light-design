import { Form, FormListOperation } from 'antd';
import React, { cloneElement, isValidElement } from 'react';

import { AnyJson } from '@/utils';

/** @name GroupField Array格式的数据 */
export default function GroupField(props: any) {
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
