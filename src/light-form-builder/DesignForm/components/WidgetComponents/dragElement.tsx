import { Component } from '@/light-form-builder/config';
import { cloneDeep } from 'lodash-es';
import { nanoid } from 'nanoid';
import { FC, ReactElement, cloneElement, useContext } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { ItemTypes, WidgetFormEnum } from '../../constants';
import { DesignContext } from '../../store';
import { ActionType } from '../../store/action';
import { DropDirection } from '../Preview/components/Form/SectionForm';

interface DragElementProps {
  children: ReactElement;
  config: Component;
}

const DragElement: FC<DragElementProps> = ({ children: child, config }) => {
  const { state, dispatch } = useContext(DesignContext);
  const { sections, fields, formType, formConfig } = state;

  const id = nanoid(5);
  const name = `${config.type}~${id}`;
  const item = {
    ...config,
    id,
    name,
    key: name,
    title: name,
  };

  const isSingleForm = formType === WidgetFormEnum.SingleForm;
  const isWidgetSingleForm = config.type === WidgetFormEnum.SingleForm;
  const isWidgetSectionForm = config.type === WidgetFormEnum.SectionForm;

  const isDisabled = !(
    formType &&
    (isWidgetSingleForm || (isSingleForm && isWidgetSectionForm))
  );

  const setFormType = (type: WidgetFormEnum, component: Component) => {
    if (type === WidgetFormEnum.SectionForm) {
      dispatch({
        type: ActionType.SET_FORM_TYPE,
        payload: { type, sections: [component] },
      });
    }
    if (type === WidgetFormEnum.SingleForm) {
      dispatch({
        type: ActionType.SET_FORM_TYPE,
        payload: { type },
      });
    }
  };

  const handleDrop = (draggedItem: Component, monitor: DragSourceMonitor) => {
    const { type: dragType, ...attr } = draggedItem;

    const result = monitor.getDropResult() as Component;

    if (monitor.didDrop() && result) {
      const { type } = draggedItem;
      if (!formType) {
        if (
          type === WidgetFormEnum.SectionForm ||
          type === WidgetFormEnum.SingleForm
        ) {
          setFormType(type, draggedItem);
        }
      } else {
        if (
          formType === WidgetFormEnum.SectionForm &&
          type === WidgetFormEnum.SectionForm
        ) {
          const { direction, id } = result;
          const cloneSections = cloneDeep(sections);
          const index = sections.findIndex((item) => item.id === id);
          cloneSections.splice(
            direction === DropDirection.TOP ? index + 1 : index,
            0,
            attr,
          );
          dispatch({
            type: ActionType.SET_FORM_SECTIONS,
            payload: cloneSections,
          });
        }
      }
    }
  };

  const [{ isDragging }, drag] = useDrag({
    item,
    type: ItemTypes.WIDGET,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: () => isDisabled,
    end: handleDrop,
  });

  const childProps = {
    ...child.props,
    ref: drag,
    style: { opacity: isDragging ? 0.5 : 1 },
    className: !isDisabled
      ? `${child.props.className} disabled`
      : child.props.className,
  };

  return cloneElement(child, childProps);
};

export default DragElement;
