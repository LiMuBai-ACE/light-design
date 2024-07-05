import { LightFieldComponent } from '@/light-form-builder/config';
import { isEmpty } from '@/utils';
import { cloneDeep } from 'lodash-es';
import React, { Dispatch, FC, createContext, useReducer } from 'react';
import { DragSourceMonitor } from 'react-dnd';
import { DropDirection, WidgetFormEnum, findItem } from '../constants';
import { Action, ActionType } from './action';
import { CommonProviderProps, FieldSection, State, initState } from './state';

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
        fields: action.payload,
      };
    // 分区表单设置
    case ActionType.SET_FORM_SECTIONS:
      return {
        ...prevState,
        sections: action.payload,
      };
    // 设置选中的组件
    case ActionType.SET_SELECT_WIDGET_ITEM:
      return {
        ...prevState,
        selectWidgetItem: action.payload,
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
  handleRemove: (draggedItem: LightFieldComponent) => FieldSection[] | LightFieldComponent;
  handleClick: (draggedItem: LightFieldComponent) => void;
}

export const DesignContext = createContext<DesignContextType>({} as DesignContextType);

const DesignProvider: FC<CommonProviderProps> = ({ children }) => {
  const [state, dispatch]: [State, Dispatch<Action>] = useReducer(designReducer, initState);

  const { sections, formType, fields } = state;

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
    const { widget_type } = draggedItem;

    const result = monitor.getDropResult() as LightFieldComponent;

    if (monitor.didDrop() && result) {
      const { parentId, direction = DropDirection.BOTTOM, id } = result;

      // 未设置表单类型
      if (!formType && [WidgetFormEnum.SectionForm, WidgetFormEnum.SingleForm].includes(widget_type as WidgetFormEnum)) {
        const sectionItem = widget_type === WidgetFormEnum.SectionForm ? { ...draggedItem, title: `${draggedItem.label}-1` } : draggedItem;
        setFormType(widget_type as WidgetFormEnum, sectionItem);
      } else {
        // SectionForm表单 处理
        if (formType === WidgetFormEnum.SectionForm) {
          const cloneSections = cloneDeep(sections);
          const len = cloneSections.length + 1;
          // hover上去的index
          const index = cloneSections.findIndex((item) => item.id === id);

          // 插入的位置
          const insertIndex = direction === DropDirection.BOTTOM ? index + 1 : index;
          switch (widget_type) {
            case WidgetFormEnum.SectionForm: {
              cloneSections.splice(insertIndex, 0, { ...draggedItem, title: `${draggedItem.label}-${len}` });
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
        } else {
          const cloneFields = cloneDeep(fields);
          // SingleForm 待处理

          if (isEmpty(parentId)) {
            if (isEmpty(cloneFields)) {
              cloneFields.push(draggedItem);
            } else {
              // hover上去的index
              const index = cloneFields.findIndex((item) => item.id === id);
              // 插入的位置
              const insertIndex = direction === DropDirection.BOTTOM ? index + 1 : index;
              cloneFields.splice(insertIndex, 0, draggedItem);
            }
          } else {
            const dropItem = findItem(cloneFields, parentId as string);
            const { currentIndex = 0 } = dropItem;
            if (isEmpty(dropItem.fields)) {
              dropItem.fields = [draggedItem];
            } else {
              const insertIndex = direction === DropDirection.BOTTOM ? currentIndex + 1 : currentIndex;
              dropItem.fields.splice(insertIndex, 0, draggedItem);
            }
          }

          dispatch({
            type: ActionType.SET_FORM_FIELDS,
            payload: cloneFields,
          });
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
    const result = monitor.getDropResult() as LightFieldComponent;
    if (isEmpty(result)) return;
    const { widget_type, id: draggedId, ...attr } = draggedItem;

    const { direction, id } = result;

    if (formType === WidgetFormEnum.SectionForm) {
      const cloneSections = cloneDeep(sections);
      if (widget_type === WidgetFormEnum.SectionForm) {
        // 元素当前的位置
        const currentIndex = cloneSections.findIndex((item) => item.id === draggedId);
        // 排除拖动元素后的数据
        const filterSections = cloneSections.filter((item) => item.id !== draggedId);
        // hover上去的index
        const hoverIndex = filterSections.findIndex((item) => item.id === id);
        // 插入位置的index
        const insertIndex = direction === DropDirection.BOTTOM ? hoverIndex + 1 : hoverIndex;
        // 插入位置与当前位置相同，不做处理
        if (insertIndex === currentIndex) return;
        filterSections.splice(insertIndex, 0, draggedItem);
        dispatch({
          type: ActionType.SET_FORM_SECTIONS,
          payload: filterSections,
        });
      }
    } else {
      // SingleForm 待处理
    }
  };

  if (state.formType === WidgetFormEnum.SectionForm) {
    console.log('SectionForm', state.sections);
  }
  if (state.formType === WidgetFormEnum.SingleForm) {
    console.log('SingleForm', state.fields);
  }

  /**
   * 删除组件
   * @param {LightFieldComponent} draggedItem 点击删除的组件信息
   */
  const handleRemove = (draggedItem: LightFieldComponent): FieldSection[] | LightFieldComponent => {
    const { parentId, widget_type, id } = draggedItem;
    // SectionForm 处理
    if (formType === WidgetFormEnum.SectionForm) {
      const cloneSections = cloneDeep(sections);
      if (widget_type === WidgetFormEnum.SectionForm) {
        if (cloneSections.length === 1) {
          dispatch({
            type: ActionType.SET_FORM_TYPE,
            payload: { widget_type: undefined, sections: [] },
          });
        } else {
          const index = cloneSections.findIndex((item) => item.id === id);
          cloneSections.splice(index, 1);
        }
      } else {
        const dropItem = findItem(cloneSections, parentId as string);
        const { currentIndex = 0 } = dropItem;
        dropItem.fields.splice(currentIndex, 1);
      }
      dispatch({
        type: ActionType.SET_FORM_SECTIONS,
        payload: cloneSections,
      });
      return cloneSections;
    } else {
      // SingleForm 待处理
      return [];
    }
  };

  const handleClick = (draggedItem: LightFieldComponent) => {
    dispatch({
      type: ActionType.SET_SELECT_WIDGET_ITEM,
      payload: draggedItem,
    });
  };

  return <DesignContext.Provider value={{ state, handleAdd, handleMove, handleRemove, handleClick }}>{children}</DesignContext.Provider>;
};
export default DesignProvider;
