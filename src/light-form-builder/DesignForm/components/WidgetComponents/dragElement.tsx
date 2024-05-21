import { Component } from '@/light-form-builder/config';
import { FC, ReactElement, cloneElement, useContext } from 'react';
import { useDrag } from 'react-dnd';
import { v4 } from 'uuid';
import { ItemTypes, WidgetFormEnum } from '../../constants';
import { DesignContext } from '../../store';

interface DragElementProps {
  children: ReactElement;
  config: Component;
}
const DragElement: FC<DragElementProps> = (props) => {
  const { config } = props;
  const id = v4().slice(0, 5);

  const item = {
    ...config,
    id,
    name: `${config.type}~${id}`,
    key: `${config.type}~${id}`,
    title: `${config.label}~${id}`,
  };

  const { state } = useContext(DesignContext);
  const { formType } = state;

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

  const [{ isDragging }, drag] = useDrag({
    // 设置填充数据
    item,
    type: ItemTypes.WIDGET,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    // 是否可以拖拽  只处理了简洁表单是否可拖拽
    canDrag: () => isDisabled,
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
