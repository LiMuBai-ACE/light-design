import { LightFieldComponent } from '@/light-form-builder/config';
import { nanoid } from 'nanoid';
import { FC, ReactElement, cloneElement, useContext } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes, WidgetFormEnum } from '../../constants';
import { DesignContext } from '../../store';

interface DragElementProps {
  children: ReactElement;
  config: LightFieldComponent;
}

const DragElement: FC<DragElementProps> = ({ children: child, config }) => {
  const { state, handleAdd } = useContext(DesignContext);
  const { formType } = state;

  const id = nanoid().replaceAll('_', '').replaceAll('-', '');

  // 根据组件类型合id 生成name
  const name = `${config.widget_type}~${id}`;
  const item = {
    ...config,
    id,
    name,
  };

  const isSingleForm = formType === WidgetFormEnum.SingleForm;
  const isWidgetSingleForm = config.widget_type === WidgetFormEnum.SingleForm;
  const isWidgetSectionForm = config.widget_type === WidgetFormEnum.SectionForm;

  const isDisabled = !(formType && (isWidgetSingleForm || (isSingleForm && isWidgetSectionForm)));

  const [{ isDragging }, drag] = useDrag({
    item,
    type: ItemTypes.WIDGET,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: () => isDisabled,
    end: handleAdd,
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
