import { FC, ReactElement, cloneElement } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../constants';

interface DragElementProps {
  children: ReactElement;
  config: any;
}
const DragElement: FC<DragElementProps> = (props) => {
  const { config } = props;
  console.log('props', props);
  const [{ isDragging }, drag] = useDrag({
    item: {
      dragItem: {
        config,
      },
    },
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
