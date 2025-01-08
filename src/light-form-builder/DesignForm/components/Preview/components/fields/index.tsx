import React from 'react';

import { FieldProps } from './type';

import { AnyJson, isEmpty } from '@/utils';
import FieldItem from '../Field/components/field';

interface LightFieldProps {
  /** 字段项配置 */
  field: FieldProps;
}

/**
 * @name LightField 字段域套件
 * @tips 关于 disabled 状态, 请在调用该方法前处理
 * */
const LightField = (props: LightFieldProps) => {
  return <FieldItem field={props.field} />;
};

interface LightFieldInsertProps extends LightFieldProps {
  /** Array格式的数据场景使用 */
  row?: AnyJson;
  /** Json格式的数据场景使用 */
  parent?: AnyJson;
}

/**
 * @name insert 插入单个字段
 * @tips 关于 disabled 状态, 请在调用该方法前处理
 * */
LightField.insert = (props: LightFieldInsertProps) => {
  const { field, row, parent } = props;
  if (isEmpty(field)) {
    return null;
  }

  if (!isEmpty(row)) {
    const { name, ...others } = field;
    const attrs = { ...others, ...row, name: [(row as AnyJson).name, name] };
    const mykey = field.key || name || field.label;
    return <LightField key={mykey} field={attrs} />;
  }

  if (!isEmpty(parent)) {
    const { name, ...others } = field;
    const attrs = { name: [...(parent as AnyJson).name, name], ...others };
    const mykey = field.key || name || field.label;
    return <LightField key={mykey} field={attrs} />;
  }

  const { key, name, label } = field;
  const mykey = key || name || label;
  return <LightField key={mykey} field={field} />;
};

interface LightFieldEachProps {
  /** 多个字段项配置 */
  fields: FieldProps[];
  /** Array格式的数据场景使用 */
  row?: AnyJson;
  /** Json格式的数据场景使用 */
  parent?: AnyJson;
}

/**
 * @name insert 插入多个字段
 * @tips 关于 disabled 状态, 请在调用该方法前处理
 */
LightField.each = (props: LightFieldEachProps) => {
  const { fields, row, parent } = props;
  if (isEmpty(fields)) {
    return null;
  }

  return fields.map((field) => LightField.insert({ field, row, parent }));
};

export default LightField;
