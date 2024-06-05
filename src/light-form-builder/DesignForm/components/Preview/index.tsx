import { LightFieldComponent } from '@/light-form-builder/config';
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

  const { sections, fields, formType, formConfig } = state;

  const widgetFormListRef = useRef<HTMLDivElement>(null);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.WIDGET,
      canDrop(draggedItem: LightFieldComponent) {
        const { widget_type } = draggedItem;
        return !formType && (widget_type === WidgetFormEnum.SectionForm || widget_type === WidgetFormEnum.SingleForm);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver({ shallow: true }),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [formType],
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
            {formType === WidgetFormEnum.SectionForm ? <SectionForm sections={sections} /> : null}

            {/* 简洁表单 */}
            {formType === WidgetFormEnum.SingleForm ? <SingleForm fields={fields} /> : null}

            {/*
              拖拽提示
              组件初始化显示的，当form表单已选择完毕后，此提示消失，改用为form表单内置的提示
              减少一些非必要的处理，会使代码看起来比较冗余
            */}
            {canDrop ? <DragTips isShow={isOver} /> : null}
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default Preview;
