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
  /** 设置组件表单字段 */
  SET_WIDGET_FORM_FIELDS = 'SET_WIDGET_FORM_FIELDS',
  /** 设置表单配置 */
  SET_FORM_CONFIG = 'SET_FORM_CONFIG',
}
