import { LightField } from '@/LightForm';
import { LightSingleFormProps } from '@/LightForm/SingleForm';
import { ItemTypes } from '@/light-form-builder/DesignForm/constants';
import { isEmpty } from '@/utils';
import React, { FC } from 'react';
import { useDrop } from 'react-dnd';
import './index.less';

const SingleForm: FC<LightSingleFormProps> = (props) => {
  const { fields: sectionFields = [] } = props;
  const fields = sectionFields || [];

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.WIDGET,
      drop(item: any, monitor: any) {
        console.log('item', item);
        const { type, ...other } = item || {};
      },
      hover: (_, monitor) => {
        // 只检查被hover的最小元素
        const didHover = monitor.isOver({ shallow: true });
        if (didHover) {
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver({ shallow: true }),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [],
  );

  return (
    <div className="widget-fields-container" ref={drop}>
      {fields.map((field) => (
        <LightField field={field} key={field.name} />
      ))}
      {isEmpty(fields) ? (
        <div className="widget-fields-empty">从左侧拖拽来添加字段</div>
      ) : null}
    </div>
  );
};

export default SingleForm;
