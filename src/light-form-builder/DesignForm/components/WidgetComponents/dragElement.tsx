import { Component } from '@/light-form-builder/config';
import { FC, ReactElement, cloneElement } from 'react';
import { useDrag } from 'react-dnd';
import { v4 } from 'uuid';
import { ItemTypes } from '../../constants';

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

  const [{ isDragging }, drag] = useDrag({
    // 设置填充数据
    item,
    type: ItemTypes.WIDGET,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const { children, ...other } = props;
  return cloneElement(children, {
    ...other,
    ref: drag,
    style: { opacity: isDragging ? 0.5 : 1 },
  });
};

export default DragElement;
