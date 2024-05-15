import { isEmpty } from '@/utils';
import { ConfigProvider, Form, FormInstance } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React, { FC, useContext, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../../constants';
import { DesignContext } from '../../store';
import './index.less';

interface Props {
  formInstance: FormInstance;
}

const WidgetForm: FC<Props> = (props) => {
  const { formInstance } = props;

  const { state, dispatch } = useContext(DesignContext);

  const widgetListRef = useRef(state.widgetList);

  const { widgetList } = state;

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.WIDGET,
      drop(item: any, monitor: any) {
        console.log('item', item);
        console.log('monitor', monitor);
        // const delta = monitor.getDifferenceFromInitialOffset();
        // const left = Math.round(delta.x);
        // const top = Math.round(delta.y);
        // return { top, left };
      },
      canDrop: (_item, monitor) => {
        const type = monitor.getItemType();
        return type === ItemTypes.WIDGET;
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver({ shallow: true }),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [],
  );

  return (
    <div className="widget-form-container">
      {isEmpty(widgetList) ? (
        <div className="widget-form-empty">从左侧拖拽来添加字段</div>
      ) : null}
      <ConfigProvider locale={zhCN}>
        <div className="widget-form-list" ref={drop}>
          <Form
            {...state.formConfig}
            form={formInstance}
            className="widget-form"
          >
            {/* {state.widgetFormList.map((widgetFormItem) => (
              <WidgetFormItem
                key={widgetFormItem.key}
                item={widgetFormItem}
                formInstance={formInstance}
              />
            ))} */}
            <></>
          </Form>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default WidgetForm;
