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
import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import DragTips from '../DragTips';
import SingleForm from './SingleForm';

const SectionCardForm: FC<LightSectionFormCardProps> = (props) => {
  const { title, warning, fields = [], extra, ...others } = props;

  const sectionCardRef = useRef<HTMLDivElement>(null);

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

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.WIDGET,
    // drop: () => ({
    //               boxType: "Picture"
    //   }),
    canDrop(draggedItem: any) {
      const { type } = draggedItem;
      return (
        type !== WidgetFormEnum.SectionForm &&
        type !== WidgetFormEnum.SingleForm
      );
    },
    hover: (item, monitor) => {},
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      canDrop: !!monitor.canDrop(),
    }),
  });

  drag(drop(sectionCardRef));
  console.log('canDrop', canDrop);

  return (
    <div className="sectionCard" ref={sectionCardRef}>
      <DragTips />
      <Card
        title={title}
        extra={extra}
        style={{
          marginBottom: 20,
          ...props.style,
          opacity: isDragging ? 0.5 : 1,
        }}
        {...others}
        id={props.id}
      >
        <Warnings content={warning} />
        <SingleForm fields={fields} />
      </Card>
      <DragTips />
    </div>
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
