import { LightSingleFormProps } from '@/LightForm/SingleForm';
import { ItemTypes } from '@/light-form-builder/DesignForm/constants';
import { LightFieldComponent, WidgetTypeEnum } from '@/light-form-builder/config';
import { isEmpty } from '@/utils';
import React, { FC, useRef } from 'react';
import { useDrop } from 'react-dnd';
import DragTips from '../DragTips';
import LightField from '../Field';
import './index.less';
interface SingleFormProps extends LightSingleFormProps {
  parentId?: string;
}

const SingleForm: FC<SingleFormProps> = (props) => {
  const { fields: sectionFields = [], parentId } = props;
  const fields = sectionFields || [];

  const singleFormRef = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.WIDGET,
    drop: () => {
      return { parentId, widget: WidgetTypeEnum.SingleForm };
    },
    canDrop(draggedItem: LightFieldComponent) {
      const { widget } = draggedItem;
      if (widget === WidgetTypeEnum.SectionForm || widget === WidgetTypeEnum.SingleForm) {
        return false;
      }
      return isEmpty(fields);
    },
    hover: (draggedItem, monitor) => {
      // 获取鼠标位置
      // const hoverBoundingRect =
      //   sectionCardRef.current?.getBoundingClientRect() as DOMRect;
      // const pointerOffset = monitor.getClientOffset() as XYCoord;
      // const { top, height } = hoverBoundingRect;
      // const hoverOffsetTop = pointerOffset?.y - top;
      // const dividerHeight = height / 2;
      // const hoverDirection =
      //   hoverOffsetTop > dividerHeight
      //     ? DropDirection.BOTTOM
      //     : DropDirection.TOP;
      // // 避免重复触发state更新
      // if (direction === hoverDirection) return;
      // setDirection(hoverDirection);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  drop(singleFormRef);

  return (
    <div className="widget-fields-container" ref={singleFormRef}>
      {fields.map((field) => (
        <LightField field={{ ...field, parentId }} key={field.name} />
      ))}
      {!(isOver && canDrop) && isEmpty(fields) ? <div className="widget-fields-empty">从左侧拖拽来添加字段</div> : null}
      {canDrop ? <DragTips isShow={isOver} /> : null}
    </div>
  );
};

export default SingleForm;
