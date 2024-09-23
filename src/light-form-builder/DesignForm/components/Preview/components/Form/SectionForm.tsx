import Card from '@/components/card';
import { Warnings } from '@/components/warnings';
import { FieldSection } from '@/light-form-builder/DesignForm/store/state';
import { LightFieldComponent, WidgetTypeEnum } from '@/light-form-builder/config';
import React, { FC } from 'react';
import DragDropElement from '../DragDropElement';
import SingleForm from './SingleForm';

const SectionCardForm: FC<FieldSection> = (props) => {
  const { title, warning, fields = [], extra, style, ...others } = props;

  const canDrop = (draggedItem: LightFieldComponent) => {
    const { widget_type } = draggedItem;
    return widget_type === WidgetTypeEnum.SectionForm && props.id !== draggedItem.id;
  };

  const attrs = {
    item: { ...props },
    canDrop,
  };

  const cardAttrs = {
    title,
    extra,
    style,
    ...others,
    id: props.id,
  };

  return (
    <DragDropElement {...attrs}>
      <Card {...cardAttrs}>
        <Warnings content={warning} />
        <SingleForm fields={fields} parentId={props.id} />
      </Card>
    </DragDropElement>
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
