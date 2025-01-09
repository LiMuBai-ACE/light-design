import { ReactNode } from 'react';

import type { FormInstance, FormItemProps, FormListFieldData } from 'antd';
import { NamePath } from 'antd/es/form/interface';

import { AnyJson } from '@/utils';
import { WidgetType } from '../widgets/constants';

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
  widget?: WidgetType | ReactNode;
  placeholder?: string;
  options?: any[];
  hasAll?: boolean;
  /**
   * @name 是否禁用
   * @tips 如果设置 disabled 属性,且 widget 为 groups和json 时,会优先使用field自带的 disabled 属性
   * @tips 如果子级field未设置 disabled,则父级field的 disabled 属性会替代子级的field的 disabled 属性
   */
  disabled?: boolean;
  props?: any;
  width?: number | string;
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
 * @name FieldProps
 * @tips watch 字段观察者集合
 * @tips conditions 条件渲染的判断集合
 * @tips 在 LightField 的定义中, disabled 和 placeholder 将具备维度提升
 * @tips 凡使用了 watch、conditions、dependencies 特性的字段, 均向子组件隐式传递观测数据。
 *       所嵌套的子组件内，从props中可以读取到observed信息，即观测数据
 * */
export interface FieldProps extends FormItemProps<any> {
  widget?: ReactNode | FieldWidgetProps;
  disabled?: boolean;
  placeholder?: string;
  conditions?: ConditionModel[];
  watch?: WartchConfig[];
  readonly?: boolean;
  copyable?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  tips?: ReactNode;
  /** 静态渲染节点 */
  node?: ReactNode;
  [key: string]: any;
}

// 字段定义-父级节点的NamePath集合
export interface FieldParentProps {
  name: (string | number)[];
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
