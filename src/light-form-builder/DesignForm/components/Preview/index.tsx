import { Component } from '@/light-form-builder/config';
import { Tips, isEmpty } from '@/utils';
import { ConfigProvider, Form, FormInstance } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { cloneDeep } from 'lodash-es';
import React, { FC, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes, WidgetFormEnum } from '../../constants';
import { DesignContext } from '../../store';
import { ActionType } from '../../store/action';
import SectionForm from './components/SectionForm';
import SingleForm from './components/SingleForm';
import './index.less';

interface PreviewProps {
  formInstance: FormInstance;
}

const Preview: FC<PreviewProps> = (props) => {
  const { formInstance } = props;

  const { state, dispatch } = useContext(DesignContext);

  const { sections, fields, formType } = state;

  const setFormType = (type: 'SectionForm' | 'SingleForm', attr: Component) => {
    const cloneSections = cloneDeep(sections);
    const newSections = [...cloneSections, attr];
    if (type === 'SectionForm') {
      dispatch({
        type: ActionType.SET_FORM_TYPE,
        payload: { type, sections: newSections },
      });
    }
    if (type === 'SingleForm') {
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

        if (
          type === WidgetFormEnum.SectionForm ||
          type === WidgetFormEnum.SingleForm
        ) {
          if (formType === WidgetFormEnum.SectionForm) {
            if (type === formType) {
              return;
            } else {
              Tips.warning('你已经设置了表单类型，不能重复设置');
              return;
            }
          }
          setFormType(type, other);
        }
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
      {isEmpty(formType) ? (
        <div className="widget-form-empty">
          请先设置表单类型后
          <br />
          再从左侧拖拽来添加字段
        </div>
      ) : null}
      <ConfigProvider locale={zhCN}>
        <Form {...state.formConfig} form={formInstance} className="widget-form">
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
