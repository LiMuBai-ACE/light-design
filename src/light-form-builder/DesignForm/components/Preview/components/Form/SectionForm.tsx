import {
  LightSectionFormCardProps,
  LightSectionFormProps,
} from '@/LightForm/SectionForm';
import Card from '@/components/card';
import { Warnings } from '@/components/warnings';
import {
  ItemTypes,
  WidgetFormEnum,
} from '@/light-form-builder/DesignForm/constants';
import React, { FC, useRef, useState } from 'react';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import DragTips from '../DragTips';
import SingleForm from './SingleForm';

export enum DropDirection {
  TOP = 'top',
  BOTTOM = 'bottom',
}

const SectionCardForm: FC<LightSectionFormCardProps> = (props) => {
  const { title, warning, fields = [], extra, ...others } = props;

  const sectionCardRef = useRef<HTMLDivElement>(null);

  const [direction, setDirection] = useState<DropDirection | undefined>();

  const [{ isDragging }, drag] = useDrag({
    // 设置填充数据
    item: {
      ...props,
    },
    type: ItemTypes.WIDGET,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop }, drop] = useDrop(() => {
    return {
      options: {
        ...props,
      },
      accept: ItemTypes.WIDGET,
      drop: (draggedItem, monitor) => {
        return {
          ...props,
          direction,
        };
      },
      canDrop(draggedItem: any) {
        const { type } = draggedItem;
        return type === WidgetFormEnum.SectionForm;
      },
      hover: (draggedItem, monitor) => {
        // 获取鼠标位置
        const hoverBoundingRect =
          sectionCardRef.current?.getBoundingClientRect() as DOMRect;

        const pointerOffset = monitor.getClientOffset() as XYCoord;
        const { top, height } = hoverBoundingRect;

        const hoverOffsetTop = pointerOffset?.y - top;

        const dividerHeight = height / 2;

        const hoverDirection =
          hoverOffsetTop > dividerHeight
            ? DropDirection.BOTTOM
            : DropDirection.TOP;
        // throttle(() => setDirection(hoverDirection), 2000);
        setDirection(hoverDirection);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    };
  }, [props]);

  // useEffect(() => {
  //   if (isOver && canDrop) {
  //     setDirection(undefined);
  //   }
  // }, [isOver, canDrop]);

  drag(drop(sectionCardRef));
  console.log('isOver', isOver);

  return (
    <>
      <div
        className="sectionCard"
        ref={sectionCardRef}
        style={{ marginBottom: 20 }}
      >
        <DragTips
          isShow={isOver && canDrop && direction === DropDirection.TOP}
        />
        <Card
          title={title}
          extra={extra}
          style={{
            ...props.style,
            opacity: isDragging ? 0.5 : 1,
          }}
          {...others}
          id={props.id}
        >
          <Warnings content={warning} />
          <SingleForm fields={fields} />
        </Card>
        <DragTips
          isShow={isOver && canDrop && direction === DropDirection.BOTTOM}
        />
      </div>
    </>
  );
};

const SectionForm: FC<LightSectionFormProps> = (props) => {
  const { sections = [] } = props;

  return sections.map((section: LightSectionFormCardProps) => {
    const { key, ...others } = section;

    const mykey = (key || others?.title) as number | string;

    return <SectionCardForm key={mykey} {...others} />;
  });
};

export default SectionForm;
