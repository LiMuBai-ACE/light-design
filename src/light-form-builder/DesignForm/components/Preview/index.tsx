import { Component } from '@/light-form-builder/config';
import { isEmpty } from '@/utils';
import { ConfigProvider, Form, FormInstance } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { cloneDeep } from 'lodash-es';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes, WidgetFormEnum } from '../../constants';
import { DesignContext } from '../../store';
import { ActionType } from '../../store/action';
import { State } from '../../store/state';
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
  const myState = useRef<State>(state);

  useEffect(() => {
    myState.current = state;
  }, [state]);

  const { sections, fields, formType, formConfig } = myState.current;
  const setFormType = (type: WidgetFormEnum, attr: Component) => {
    const cloneSections = cloneDeep(sections);
    const newSections = [...cloneSections, attr];
    if (type === WidgetFormEnum.SectionForm) {
      dispatch({
        type: ActionType.SET_FORM_TYPE,
        payload: { type, sections: newSections },
      });
    }
    if (type === WidgetFormEnum.SingleForm) {
      dispatch({
        type: ActionType.SET_FORM_TYPE,
        payload: { type },
      });
    }
  };

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.WIDGET,
      drop(item: any, monitor: any) {
        console.log('item', item);
        const { type, ...other } = item || {};

        if (!formType) {
          if (
            type === WidgetFormEnum.SectionForm ||
            type === WidgetFormEnum.SingleForm
          ) {
            setFormType(type, other);
          }
        } else {
          if (
            formType === WidgetFormEnum.SectionForm &&
            type === WidgetFormEnum.SectionForm
          ) {
            console.log('处理多个section情况');
            // setFormType(type, other);
          }
        }
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
    <div className="widget-form-container">
      {isEmpty(formType) ? (
        <div className="widget-form-empty">
          请先设置表单类型后
          <br />
          再从左侧拖拽来添加字段
        </div>
      ) : null}
      <ConfigProvider locale={zhCN}>
        <Form {...formConfig} form={formInstance} className="widget-form">
          <div className="widget-form-list" ref={drop}>
            {formType === 'SectionForm' ? (
              <SectionForm sections={sections} />
            ) : null}
            {formType === 'SingleForm' ? <SingleForm fields={fields} /> : null}
          </div>
        </Form>
      </ConfigProvider>
    </div>
  );
};

export default Preview;
