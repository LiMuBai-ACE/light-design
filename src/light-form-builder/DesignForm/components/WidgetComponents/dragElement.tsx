import { FieldComponent } from '@/light-form-builder/config';
import { isEmpty } from '@/utils';
import { cloneDeep } from 'lodash-es';
import { nanoid } from 'nanoid';
import { FC, ReactElement, cloneElement, useContext } from 'react';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { ItemTypes, WidgetFormEnum, findItem } from '../../constants';
import { DesignContext } from '../../store';
import { ActionType } from '../../store/action';
import { DropDirection } from '../Preview/components/Form/SectionForm';

interface DragElementProps {
  children: ReactElement;
  config: FieldComponent;
}

const DragElement: FC<DragElementProps> = ({ children: child, config }) => {
  const { state, dispatch } = useContext(DesignContext);
  const { sections, formType } = state;

  const id = nanoid().replace('_', '').replace('-', '');

  // 根据组件类型合id 生成name
  const name = `${config.type}~${id}`;
  const item = {
    ...config,
    id,
    name,
  };

  const isSingleForm = formType === WidgetFormEnum.SingleForm;
  const isWidgetSingleForm = config.type === WidgetFormEnum.SingleForm;
  const isWidgetSectionForm = config.type === WidgetFormEnum.SectionForm;

  const isDisabled = !(formType && (isWidgetSingleForm || (isSingleForm && isWidgetSectionForm)));

  const setFormType = (type: WidgetFormEnum, component: FieldComponent) => {
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

  // 拖拽结束
  const handleDrop = (draggedItem: FieldComponent, monitor: DragSourceMonitor) => {
    const { type: dragType, ...attr } = draggedItem;

    const result = monitor.getDropResult() as FieldComponent;
    if (monitor.didDrop() && result) {
      const cloneSections = cloneDeep(sections);
      const { parentId, direction = DropDirection.BOTTOM, id } = result;

      if (!formType) {
        const isWidgetForm = [WidgetFormEnum.SectionForm, WidgetFormEnum.SingleForm].includes(dragType as WidgetFormEnum);

        if (isWidgetForm) {
          if (dragType === WidgetFormEnum.SectionForm) {
            setFormType(dragType as WidgetFormEnum, { ...draggedItem, title: `${attr.label}-1` });
          } else {
            setFormType(dragType as WidgetFormEnum, draggedItem);
          }
        }
      } else {
        switch (dragType) {
          case WidgetFormEnum.SectionForm: {
            // 删除dropEffect 保持result的结构是我需要的
            // delete result.dropEffect;
            const len = cloneSections.length + 1;

            // if(isEmpty(result)){
            //   cloneSections.push({ ...attr, title: `${attr.label}-${len}` });
            // }else{
            const index = cloneSections.findIndex((item) => item.id === id);
            const insertIndex = direction === DropDirection.BOTTOM ? index + 1 : index;
            cloneSections.splice(insertIndex, 0, { ...attr, title: `${attr.label}-${len}` });
            // }

            dispatch({
              type: ActionType.SET_FORM_SECTIONS,
              payload: cloneSections,
            });
            break;
          }
          default: {
            console.log('111', 111);
            const dropItem = findItem(cloneSections, parentId as string);
            const { currentIndex = 0 } = dropItem;
            console.log('dropItem', dropItem);
            if (isEmpty(dropItem.fields)) {
              dropItem.fields = [draggedItem];
              dispatch({
                type: ActionType.SET_FORM_SECTIONS,
                payload: cloneSections,
              });
            } else {
              const insertIndex = direction === DropDirection.BOTTOM ? currentIndex + 1 : currentIndex;

              dropItem.fields.splice(insertIndex, 0, draggedItem);

              dispatch({
                type: ActionType.SET_FORM_SECTIONS,
                payload: cloneSections,
              });
            }
            break;
          }
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
    className: !isDisabled ? `${child.props.className} disabled` : child.props.className,
  };

  return cloneElement(child, childProps);
};

export default DragElement;
