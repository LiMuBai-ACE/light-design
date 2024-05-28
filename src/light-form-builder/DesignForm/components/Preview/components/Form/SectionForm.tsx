import {
  LightSectionFormCardProps,
  LightSectionFormProps,
} from '@/LightForm/SectionForm';
import Card from '@/components/card';
import { Warnings } from '@/components/warnings';
import { ItemTypes } from '@/light-form-builder/DesignForm/constants';
import React, { FC } from 'react';
import { useDrag } from 'react-dnd';
import DragTips from '../DragTips';
import SingleForm from './SingleForm';

const SectionCardForm: FC<LightSectionFormCardProps> = (props) => {
  const { title, warning, fields = [], extra, ...others } = props;

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

  return (
    <div className="sectionCard" ref={drag}>
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
