import React from 'react';
import { FormListFieldData } from 'antd';

import { isEmpty } from 'light-design/utils';

import FieldConditions from './components/conditions';
import FieldWatch from './components/watch';
import { ConditionModel, FieldProps, FieldParentProps, SectionFieldProps, SectionFieldsProps } from './type';

import FieldItem from './components/field';

/** @name LightField 字段域套件 */
const LightField = ({ field }: { field: FieldProps }) => {
  const { conditions, watch, dependencies, ...others } = field;

  // 条件渲染, conditions 全部满足时渲染
  if (!isEmpty(conditions)) {
    return (
      <FieldConditions conditions={conditions as ConditionModel[]}>
        <FieldItem field={others as FieldProps} />
      </FieldConditions>
    );
  }

  // 数据观察者, 在观察项发生变化时子组件数据更新
  if (!isEmpty(dependencies) || !isEmpty(watch)) {
    const { name } = others;
    const attrs = { watch, dependencies, name };
    return (
      <FieldWatch {...attrs}>
        <FieldItem field={others} />
      </FieldWatch>
    );
  }

  return <FieldItem field={others} />;
};

/**
 * @name insert 插入单个字段
 * @param field 字段项配置
 * @param row Array格式的数据场景使用
 * @param parent Json格式的数据场景使用
 * @tips 关于 disabled 状态, 请在调用该方法前处理
 * */
LightField.insert = ({ field, row, parent }: SectionFieldProps) => {
  if (isEmpty(field)) {
    return null;
  }

  if (!isEmpty(row)) {
    const { name, ...others } = field;

    const attrs = {
      ...others,
      ...row,
      name: [(row as FormListFieldData).name, name],
    } as FieldProps;

    const mykey = field.key || name || field.label;
    return <LightField key={mykey} field={attrs} />;
  }

  if (!isEmpty(parent)) {
    const { name, ...others } = field;

    const attrs = {
      ...others,
      name: [...(parent as FieldParentProps).name, name],
    } as FieldProps;

    const mykey = field.key || name || field.label;
    return <LightField key={mykey} field={attrs} />;
  }

  const { key, name, label } = field;
  const mykey = key || name || label;
  return <LightField key={mykey} field={field} />;
};

/**
 * @name each 插入多个字段
 * @param fields 字段项配置List
 * @param row Array格式的数据场景使用
 * @param parent Json格式的数据场景使用
 * @tips 关于 disabled 状态, 请在调用该方法前处理
 * */
LightField.each = ({ fields, row, parent }: SectionFieldsProps) => {
  if (isEmpty(fields)) {
    return null;
  }

  return fields.map((field) => LightField.insert({ field, row, parent }));
};

export default LightField;
