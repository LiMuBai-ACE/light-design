import React from 'react';

import { FieldProps } from './type';

import { LightFieldComponent, WidgetTypeEnum } from '@/light-form-builder/config';
import { AnyJson, isEmpty } from '@/utils';
import DragDropElement from '../DragDropElement';
import FieldItem from './components/field';

interface LightFieldProps {
  /** 字段项配置 */
  field: FieldProps;
}

/**
 * @name LightField 字段域套件
 * @tips 关于 disabled 状态, 请在调用该方法前处理
 * */
const LightField = (props: LightFieldProps) => {
  const { field } = props;
  const { parentId, ...others } = field;
  const canDrop = (draggedItem: LightFieldComponent) => {
    console.log('draggedItem', draggedItem);
    const { widget } = draggedItem;
    // return widget === WidgetTypeEnum.Groups || widget === WidgetTypeEnum.Json;
    if (widget === WidgetTypeEnum.SectionForm || widget === WidgetTypeEnum.SingleForm) {
      return false;
    }
    return true;
  };

  const attrs = {
    item: { ...field },
    canDrop,
  };

  return (
    <DragDropElement {...(attrs as any)}>
      <FieldItem field={others} />
    </DragDropElement>
  );
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
