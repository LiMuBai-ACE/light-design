import { Form, FormInstance } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { FC, ReactNode, cloneElement, isValidElement } from 'react';

import { isEmpty } from '@/utils';

import { ConditionExtend } from '../constants';
import { ConditionModel } from '../type';

export interface FieldConditionsProps {
  conditions: ConditionModel[];
  children?: ReactNode;
}

/** @name FieldConditions 条件渲染 */
const FieldConditions: FC<FieldConditionsProps> = (props) => {
  const { conditions, children } = props;

  const namelist = ConditionExtend.fields({ conditions }) as NamePath[];

  if (isEmpty(namelist)) {
    console.error('namelist 不能为空, 请传入 NamePath[]');
    return null;
  }

  // 监听指定的字段值, 当发生变化时通知下级节点更新
  const onCompare = (prev: any, current: any) => {
    const options = { prev, current, namelist };
    return ConditionExtend.compare(options);
  };

  return (
    <Form.Item noStyle shouldUpdate={onCompare}>
      {(forminst) => {
        const form = forminst as FormInstance;
        const params = { form, namelist, conditions };
        const res = ConditionExtend.check(params);

        if (!res) {
          return null;
        }

        if (isValidElement(children)) {
          const observed = form.getFieldsValue(namelist);
          return cloneElement(children, { observed } as any) || null;
        }

        return children;
      }}
    </Form.Item>
  );
};

export default FieldConditions;
