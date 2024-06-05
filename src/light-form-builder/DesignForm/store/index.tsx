import { LightFieldComponent } from '@/light-form-builder/config';
import { isEmpty } from '@/utils';
import { cloneDeep } from 'lodash-es';
import React, { Dispatch, FC, createContext, useReducer } from 'react';
import { DragSourceMonitor } from 'react-dnd';
import { DropDirection, WidgetFormEnum, findItem } from '../constants';
import { Action, ActionType } from './action';
import { CommonProviderProps, State, initState } from './state';

type Reducer = (prevState: State, action: Action) => any;

const designReducer: Reducer = (prevState: State, action: Action) => {
  const { payload = {} } = action;

  const { widget_type, ...other } = payload;

  switch (action.type) {
    // 设置表单类型
    case ActionType.SET_FORM_TYPE:
      return {
        ...prevState,
        ...other,
        formType: widget_type,
      };
    // 简单的组件设置
    case ActionType.SET_FORM_FIELDS:
      return {
        ...prevState,
        widgetFormList: action.payload,
      };
    // 分区表单设置
    case ActionType.SET_FORM_SECTIONS:
      return {
        ...prevState,
        sections: action.payload,
      };
    case ActionType.SET_FORM_CONFIG:
      return {
        ...prevState,
        formConfig: action.payload,
      };
    case ActionType.SET_GLOBAL:
      return {
        ...prevState,
        ...action.payload,
      };
    default:
      return initState;
  }
};

/**
 * 拖拽处理
 */
type handleDrag = (draggedItem: LightFieldComponent, monitor: DragSourceMonitor) => void;

interface DesignContextType {
  state: State;
  // dispatch: Dispatch<Action>;
  handleAdd: handleDrag;
  handleMove: handleDrag;
}

export const DesignContext = createContext<DesignContextType>({} as DesignContextType);

const DesignProvider: FC<CommonProviderProps> = ({ children }) => {
  const [state, dispatch]: [State, Dispatch<Action>] = useReducer(designReducer, initState);

  const { sections, formType } = state;

  // 辅助函数：创建一个带有新标题的SectionForm组件
  const createSectionFormComponent = (component: LightFieldComponent, len: number) => ({
    ...component,
    title: `${component.label}-${len}`,
  });

  // 设置表单类型
  const setFormType = (widget_type: WidgetFormEnum, component: LightFieldComponent) => {
    if (widget_type === WidgetFormEnum.SectionForm) {
      dispatch({
        type: ActionType.SET_FORM_TYPE,
        payload: { widget_type, sections: [createSectionFormComponent(component, 1)] },
      });
    } else if (widget_type === WidgetFormEnum.SingleForm) {
      dispatch({
        type: ActionType.SET_FORM_TYPE,
        payload: { widget_type },
      });
    } else {
      console.error('设置表单类型出错，不支持的表单类型：', widget_type);
    }
  };

  /**
   * 添加组件
   * @param {LightFieldComponent} draggedItem 被拖动的组件信息
   * @param {DragSourceMonitor} monitor hover上去的组件信息
   */
  const handleAdd = (draggedItem: LightFieldComponent, monitor: DragSourceMonitor) => {
    const { widget_type, ...attr } = draggedItem;

    const result = monitor.getDropResult() as LightFieldComponent;

    if (monitor.didDrop() && result) {
      const cloneSections = cloneDeep(sections);
      const len = cloneSections.length + 1;
      const { parentId, direction = DropDirection.BOTTOM, id } = result;

      // hover上去的index
      const index = cloneSections.findIndex((item) => item.id === id);

      // 插入的位置
      const insertIndex = direction === DropDirection.BOTTOM ? index + 1 : index;

      if (!formType && [WidgetFormEnum.SectionForm, WidgetFormEnum.SingleForm].includes(widget_type as WidgetFormEnum)) {
        const sectionItem = widget_type === WidgetFormEnum.SectionForm ? { ...attr, title: `${attr.label}-1` } : attr;
        setFormType(widget_type as WidgetFormEnum, sectionItem);
      } else if (widget_type === WidgetFormEnum.SectionForm) {
        cloneSections.splice(insertIndex, 0, createSectionFormComponent(attr, len) as LightFieldComponent);

        dispatch({
          type: ActionType.SET_FORM_SECTIONS,
          payload: cloneSections,
        });
      } else {
        switch (widget_type) {
          case WidgetFormEnum.SectionForm: {
            // 删除dropEffect 保持result的结构是我需要的
            // delete result.dropEffect;
            // if(isEmpty(result)){
            //   cloneSections.push({ ...attr, title: `${attr.label}-${len}` });
            // }else{
            cloneSections.splice(insertIndex, 0, { ...attr, title: `${attr.label}-${len}` });
            // }

            dispatch({
              type: ActionType.SET_FORM_SECTIONS,
              payload: cloneSections,
            });
            break;
          }
          default: {
            const dropItem = findItem(cloneSections, parentId as string);
            const { currentIndex = 0 } = dropItem;

            if (isEmpty(dropItem.fields)) {
              dropItem.fields = [draggedItem];
            } else {
              const insertIndex = direction === DropDirection.BOTTOM ? currentIndex + 1 : currentIndex;
              dropItem.fields.splice(insertIndex, 0, draggedItem);
            }
            dispatch({
              type: ActionType.SET_FORM_SECTIONS,
              payload: cloneSections,
            });
            break;
          }
        }
      }
    }
  };

  /**
   * 移动组件
   * @param {LightFieldComponent} draggedItem 被拖动的组件信息
   * @param {DragSourceMonitor} monitor hover上去的组件信息
   */
  const handleMove = (draggedItem: LightFieldComponent, monitor: DragSourceMonitor) => {
    const { widget_type, ...attr } = draggedItem;

    const result = monitor.getDropResult() as LightFieldComponent;
    console.log('result', result);
    console.log('draggedItem', draggedItem);
  };

  return <DesignContext.Provider value={{ state, handleAdd, handleMove }}> {children} </DesignContext.Provider>;
};
export default DesignProvider;
