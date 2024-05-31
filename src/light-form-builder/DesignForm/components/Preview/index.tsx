import { FieldComponent } from '@/light-form-builder/config';
import { isEmpty } from '@/utils';
import { ConfigProvider, Form, FormInstance } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { FC, useContext, useRef } from 'react';
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

  const { state } = useContext(DesignContext);

  const widgetFormListRef = useRef<HTMLDivElement>(null);

  const { sections, fields, formType, formConfig } = state;

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.WIDGET,
      canDrop(draggedItem: FieldComponent) {
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
      {!(isOver && canDrop) && !isOver && isEmpty(formType) ? (
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
            {formType === WidgetFormEnum.SectionForm ? (
              <SectionForm sections={sections} />
            ) : null}

            {/* 简洁表单 */}
            {formType === WidgetFormEnum.SingleForm ? (
              <SingleForm fields={fields} />
            ) : null}

            {/* 提示 */}
            {canDrop ? <DragTips isShow={isOver} /> : null}
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default Preview;
