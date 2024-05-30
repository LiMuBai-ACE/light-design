import { AnyJson } from '@/utils';

export interface Action {
  type: ActionType;
  payload: AnyJson;
}

export enum ActionType {
  /** 全局配置 */
  SET_GLOBAL = 'SET_FORM_GLOBAL',
  /** 选中的组件 */
  SET_SELECT_WIDGET_ITEM = 'SET_SELECT_WIDGET_ITEM',
  /** 设置简洁组件表单字段 */
  SET_FORM_FIELDS = 'SET_FORM_FIELDS',
  /** 设置分区组件表单字段 */
  SET_FORM_SECTIONS = 'SET_FORM_SECTIONS',
  /** 设置表单配置 */
  SET_FORM_CONFIG = 'SET_FORM_CONFIG',
  /** 设置表单类型 */
  SET_FORM_TYPE = 'SET_FORM_TYPE',
}
