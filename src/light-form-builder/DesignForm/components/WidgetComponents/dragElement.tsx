import { LightFieldComponent, WidgetTypeEnum } from '@/light-form-builder/config';
import { FC, ReactElement, cloneElement, useContext } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants';
import { DesignContext } from '../../store';
import { getId } from './constants';

interface DragElementProps {
  children: ReactElement;
  config: LightFieldComponent;
}

const DragElement: FC<DragElementProps> = ({ children: child, config }) => {
  const { state, handleAdd, handleClick } = useContext(DesignContext);
  const { formType } = state;

  const id = getId();

  // 根据组件类型合id 生成name
  const name = `${config.widget}~${id}`;
  const item = {
    ...config,
    id,
    name,
  };

  const isSingleForm = formType === WidgetTypeEnum.SingleForm;
  const isWidgetSingleForm = config.widget === WidgetTypeEnum.SingleForm;
  const isWidgetSectionForm = config.widget === WidgetTypeEnum.SectionForm;

  const isDisabled = !(formType && (isWidgetSingleForm || (isSingleForm && isWidgetSectionForm)));

  const [{ isDragging }, drag] = useDrag({
    item,
    type: ItemTypes.WIDGET,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: () => isDisabled,
    end: (item, monitor) => {
      // 添加组件
      handleAdd(item, monitor);

      // 选中组件
      handleClick(item);
    },
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
