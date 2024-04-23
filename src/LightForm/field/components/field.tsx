import React, { isValidElement, cloneElement, Attributes, ReactNode } from 'react';

import { Form } from 'antd';

import { isEmpty, isObject, ClassName, AnyJson } from 'light-design/utils';

import FieldWidget from '../../widgets';
import ReadonlyField from '../../widgets/readonly';
import { WidgetType } from '../../widgets/constants';

import JsonField from './json';
import GroupField from './group';

import { FieldWidgetProps, FieldProps } from '../type';

interface MyProps {
  field: FieldProps;
  observed?: AnyJson;
}

/**
 * @param field 字段项参数
 * @param observed dependencies 或者 watch 的数据
 * */

export default function FieldItem({ field, observed }: MyProps) {
  const {
    node,
    widget,
    placeholder,

    copyable,
    disabled,
    readonly,

    className,
    classNames = [],
    children,
    ...others
  } = field;

  if (node && isValidElement(node)) {
    return node as ReactNode;
  }

  const myclass = {
    [className as string]: !!className,
  };

  classNames.forEach((ele: string) => {
    Object.assign(myclass, { [ele]: true });
  });

  const attrs = {
    ...others,
    disabled: disabled || readonly,
    className: ClassName.setup(myclass),
  };

  // 自定义传入的 ReactNode
  if (isValidElement(widget)) {
    const model = widget?.props as AnyJson;
    const forbidden = model?.disabled || attrs.disabled;

    return (
      <Form.Item {...attrs}>
        {/* 隐式传递 observed */}
        {cloneElement(widget, {
          placeholder: model?.placeholder || placeholder,
          disabled: forbidden,
          observed,
        } as Attributes)}
      </Form.Item>
    );
  }

  // 只读的数据
  if (readonly) {
    return (
      <Form.Item {...attrs}>
        <ReadonlyField copyable={copyable} />
      </Form.Item>
    );
  }

  // 默认是输入框
  if (isEmpty(widget)) {
    const wprops = { disabled: attrs.disabled, placeholder };
    return (
      <Form.Item {...attrs}>
        <FieldWidget {...wprops} />
      </Form.Item>
    );
  }

  // 简化组件
  if (typeof widget === 'string') {
    if (widget === WidgetType.hidden) {
      Object.assign(attrs, { noStyle: true });
    }

    return (
      <Form.Item {...attrs}>
        <FieldWidget
          widget={widget} //
          disabled={attrs.disabled}
          placeholder={placeholder}
        />
      </Form.Item>
    );
  }

  // 自定义属性的组件
  if (isObject(widget)) {
    const { widget: widgetName, content, ...wprops } = widget as FieldWidgetProps;

    const params = {
      disabled: !!(wprops?.disabled || attrs?.disabled),
      placeholder: wprops.placeholder || placeholder,
    };

    // Array 格式的数据
    if (widgetName === WidgetType.groups) {
      return (
        <Form.Item {...attrs}>
          <GroupField name={attrs.name} widget={content} observed={observed} {...params} />
        </Form.Item>
      );
    }

    // JSON 格式数据
    if (widgetName === WidgetType.json) {
      return (
        <Form.Item {...attrs}>
          <JsonField widget={content} observed={observed} {...params} />
        </Form.Item>
      );
    }

    // 常用格式的数据 或 自定义子组件
    return (
      <Form.Item {...attrs}>
        <FieldWidget widget={widgetName} {...wprops} {...params} />
      </Form.Item>
    );
  }

  return children as ReactNode;
}
