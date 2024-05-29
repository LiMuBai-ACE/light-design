import { LightField } from '@/LightForm';
import { LightSingleFormProps } from '@/LightForm/SingleForm';
import {
  ItemTypes,
  WidgetFormEnum,
} from '@/light-form-builder/DesignForm/constants';
import { isEmpty } from '@/utils';
import React, { FC, useRef } from 'react';
import { useDrop } from 'react-dnd';
import DragTips from '../DragTips';
import './index.less';

const SingleForm: FC<LightSingleFormProps> = (props) => {
  const { fields: sectionFields = [] } = props;
  const fields = sectionFields || [];

  const singleFormRef = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.WIDGET,
    drop(draggedItem: any, monitor: any) {},

    canDrop(draggedItem) {
      const { type } = draggedItem;
      if (
        type === WidgetFormEnum.SectionForm ||
        type === WidgetFormEnum.SingleForm
      ) {
        return false;
      }
      return true;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
      canDrop: !!monitor.canDrop(),
    }),
  });

  drop(singleFormRef);

  return (
    <div className="widget-fields-container" ref={singleFormRef}>
      {fields.map((field) => (
        <LightField field={field} key={field.name} />
      ))}
      {!(isOver && canDrop) && isEmpty(fields) ? (
        <div className="widget-fields-empty">从左侧拖拽来添加字段</div>
      ) : null}
      {canDrop ? <DragTips hidden={!isOver} /> : null}
    </div>
  );
};

export default SingleForm;
