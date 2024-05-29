import { isEmpty } from '@/utils';
import { ConfigProvider, Form, FormInstance } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { FC, useContext, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes, WidgetFormEnum } from '../../constants';
import { DesignContext } from '../../store';
import DragTips from './components/DragTips';
import SectionForm from './components/Form/SectionForm';
import SingleForm from './components/Form/SingleForm';
import './index.less';

interface PreviewProps {
  formInstance: FormInstance;
}

const Preview: FC<PreviewProps> = (props) => {
  const { formInstance } = props;

  const { state, dispatch } = useContext(DesignContext);

  const [position, setPosition] = useState();

  const widgetFormListRef = useRef<HTMLDivElement>(null);

  const { sections, fields, formType, formConfig } = state;

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.WIDGET,
      canDrop(draggedItem: any) {
        const { type } = draggedItem;
        return (
          formType !== WidgetFormEnum.SingleForm &&
          (type === WidgetFormEnum.SectionForm ||
            type === WidgetFormEnum.SingleForm)
        );
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver({ shallow: true }),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [],
  );

  drop(widgetFormListRef);

  return (
    <div className="widget-form-container">
      {canDrop && !isOver && isEmpty(formType) ? (
        <div className="widget-form-empty">
          请先设置表单类型后
          <br />
          再从左侧拖拽来添加字段
        </div>
      ) : null}
      <ConfigProvider locale={zhCN}>
        <Form {...formConfig} form={formInstance} className="widget-form">
          <div className="widget-form-list" ref={widgetFormListRef}>
            {/* 分组表单 */}
            {formType === 'SectionForm' ? (
              <SectionForm sections={sections} />
            ) : null}

            {/* 简洁表单 */}
            {formType === 'SingleForm' ? <SingleForm fields={fields} /> : null}

            {/* 提示 */}
            {canDrop ? <DragTips hidden={!isOver} /> : null}
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default Preview;
