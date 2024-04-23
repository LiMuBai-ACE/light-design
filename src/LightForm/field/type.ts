import { ReactNode } from 'react';

import { NamePath } from 'antd/es/form/interface';
import type { FormItemProps, FormInstance, FormListFieldData } from 'antd';

import { AnyJson } from 'light-design/utils';

export interface CompareProps {
  prev: any;
  current: any;
  namelist: NamePath[];
}

// 字段观察者-Field定义
export interface WartchConfig {
  name?: NamePath;
  namelist?: NamePath[];
  callback?: (arg: any) => void;
  become?: (arg: any) => any;
}

// 字段观察者-React片段参数
export interface WatchFragmentProps {
  name: NamePath;
  form: FormInstance;
  watch: WartchConfig;
  observed: AnyJson;
}

// 条件渲染-Field定义
export interface ConditionModel {
  name: NamePath;
  prop?: string;
  compare?: string;
  value: any;
}

// 条件渲染-检测方法
export interface ConditionCheckProps {
  form: FormInstance;
  namelist: NamePath[];
  conditions: ConditionModel[];
}

// 条件渲染-获取所有NamePath字段
export interface ConditionFieldProps {
  watch?: WartchConfig[];
  dependencies?: NamePath[];
  conditions?: ConditionModel[];
}

// 字段定义-Form控件的属性
export interface FieldWidgetProps extends AnyJson {
  widget?: string;
  placeholder?: string;
  options?: any[];
  hasAll?: boolean;
  disabled?: boolean;
  props?: any;
  width?: number | string;
  content?: ReactNode;
}

/**
 * @name FieldProps
 * @tips watch 字段观察者集合
 * @tips conditions 条件渲染的判断集合
 * @tips 在 LightField 的定义中, disabled 和 placeholder 将具备维度提升
 * @tips 凡使用了 watch、conditions、dependencies 特性的字段, 均向子组件隐式传递观测数据。
 *       所嵌套的子组件内，从props中可以读取到observed信息，即观测数据
 * */
export interface FieldProps extends FormItemProps<any> {
  widget?: string | ReactNode | FieldWidgetProps;
  disabled?: boolean;
  placeholder?: string;
  conditions?: ConditionModel[];
  watch?: WartchConfig[];
  readonly?: boolean;
  copyable?: boolean;
  [key: string]: any;
}

// 字段定义-父级节点的NamePath集合
export interface FieldParentProps {
  name: string[];
  [key: string]: any;
}

interface FieldInsertProps {
  row?: FormListFieldData;
  parent?: FieldParentProps;
}

export interface SectionFieldProps extends FieldInsertProps {
  field: FieldProps;
}

export interface SectionFieldsProps extends FieldInsertProps {
  fields: FieldProps[];
}
