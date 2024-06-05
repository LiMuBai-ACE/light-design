import Card from '@/components/card';
import { Warnings } from '@/components/warnings';
import { DropDirection, ItemTypes, WidgetFormEnum } from '@/light-form-builder/DesignForm/constants';
import { DesignContext } from '@/light-form-builder/DesignForm/store';
import { FieldSection } from '@/light-form-builder/DesignForm/store/state';
import { LightFieldComponent } from '@/light-form-builder/config';
import React, { FC, useContext, useRef, useState } from 'react';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import DragTips from '../DragTips';
import SingleForm from './SingleForm';

const SectionCardForm: FC<FieldSection> = (props) => {
  const { title, warning, fields = [], extra, ...others } = props;
  const { handleMove } = useContext(DesignContext);

  const sectionCardRef = useRef<HTMLDivElement>(null);

  const [direction, setDirection] = useState<DropDirection | undefined>();

  const [{ isDragging }, drag] = useDrag({
    // 设置填充数据
    item: {
      ...props,
      widget_type: WidgetFormEnum.SectionForm,
    },
    type: ItemTypes.WIDGET,
    end: handleMove,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver, canDrop }, drop] = useDrop(() => {
    return {
      accept: ItemTypes.WIDGET,
      drop: () => {
        return {
          ...props,
          direction,
        };
      },
      canDrop(draggedItem: LightFieldComponent) {
        const { widget_type } = draggedItem;
        return widget_type === WidgetFormEnum.SectionForm && props.id !== draggedItem.id;
      },
      hover: (draggedItem, monitor) => {
        // 获取鼠标位置
        const hoverBoundingRect = sectionCardRef.current?.getBoundingClientRect() as DOMRect;

        const pointerOffset = monitor.getClientOffset() as XYCoord;
        const { top, height } = hoverBoundingRect;

        const hoverOffsetTop = pointerOffset?.y - top;

        const dividerHeight = height / 2;

        const hoverDirection = hoverOffsetTop > dividerHeight ? DropDirection.BOTTOM : DropDirection.TOP;
        // 避免重复触发state更新
        if (direction === hoverDirection) return;
        setDirection(hoverDirection);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    };
  }, [props, direction]);

  drag(drop(sectionCardRef));

  return (
    <>
      <div className="sectionCard" ref={sectionCardRef} style={{ marginBottom: 20 }}>
        <DragTips isShow={isOver && canDrop && direction === DropDirection.TOP} />
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
          <SingleForm fields={fields} parentId={props.id} />
        </Card>
        <DragTips isShow={isOver && canDrop && direction === DropDirection.BOTTOM} />
      </div>
    </>
  );
};

const SectionForm: FC<{ sections: FieldSection[] }> = (props) => {
  const { sections = [] } = props;

  return sections.map((section: LightFieldComponent) => {
    const { name } = section;

    const sectionCardKey = name as string;

    return <SectionCardForm {...section} key={sectionCardKey} />;
  });
};

export default SectionForm;
