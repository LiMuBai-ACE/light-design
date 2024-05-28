import { Component } from '@/light-form-builder/config';
import { cloneDeep } from 'lodash-es';
import { FC, ReactElement, cloneElement, useContext } from 'react';
import { useDrag } from 'react-dnd';
import { v4 } from 'uuid';
import { ItemTypes, WidgetFormEnum } from '../../constants';
import { DesignContext } from '../../store';
import { ActionType } from '../../store/action';

interface DragElementProps {
  children: ReactElement;
  config: Component;
}
const DragElement: FC<DragElementProps> = (props) => {
  const { config } = props;
  const id = v4().slice(0, 5);

  const name = `${config.type}~${id}`;
  const item = {
    ...config,
    id,
    name,
    key: name,
    title: name,
  };

  const { state, dispatch } = useContext(DesignContext);

  const { sections, fields, formType, formConfig } = state;

  console.log('state', state);

  const isSingleForm = formType === WidgetFormEnum.SingleForm;
  // const isSectionForm = formType === WidgetFormEnum.SectionForm;
  // 简洁表单
  const isWidgetSingleForm = config.type === WidgetFormEnum.SingleForm;
  // 分区表单
  const isWidgetSectionForm = config.type === WidgetFormEnum.SectionForm;

  // 组件禁用
  const isDisabled = !(
    formType &&
    (isWidgetSingleForm || (isSingleForm && isWidgetSectionForm))
  );

  const setFormType = (type: WidgetFormEnum, attr: Component) => {
    const cloneSections = cloneDeep(sections);
    const newSections = [...cloneSections, attr];
    if (type === WidgetFormEnum.SectionForm) {
      dispatch({
        type: ActionType.SET_FORM_TYPE,
        payload: { type, sections: newSections },
      });
    }
    if (type === WidgetFormEnum.SingleForm) {
      dispatch({
        type: ActionType.SET_FORM_TYPE,
        payload: { type },
      });
    }
  };

  const [{ isDragging }, drag] = useDrag({
    // 设置填充数据
    item,
    type: ItemTypes.WIDGET,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    // 是否可以拖拽  只处理了简洁表单是否可拖拽
    canDrag: () => isDisabled,
    end(draggedItem, monitor) {
      const item = monitor.getItem();
      const result = monitor.getDropResult();
      // 确定组件已经放置到右侧区域，有结果返回的时候，调用新增组件的方法
      if (monitor.didDrop() && result) {
        console.log('draggedItem', draggedItem);
        console.log('result', result);
        const { type, ...attr } = draggedItem;

        if (!formType) {
          if (
            type === WidgetFormEnum.SectionForm ||
            type === WidgetFormEnum.SingleForm
          ) {
            setFormType(type, attr);
          }
        } else {
          if (
            formType === WidgetFormEnum.SectionForm &&
            type === WidgetFormEnum.SectionForm
          ) {
            console.log('处理多个section情况');
            // setFormType(type, other);
          }
        }
      }
    },
  });

  const { children: child, ...otherProps } = props;

  const childProps = {
    ...otherProps,
    ref: drag,
    style: { opacity: isDragging ? 0.5 : 1 },
    className: !isDisabled
      ? `${child.props.className} disabled`
      : child.props.className,
  };

  return cloneElement(child, childProps);
};

export default DragElement;
