import { Component } from '@/light-form-builder/config';
import { isEmpty } from '@/utils';
import { ConfigProvider, Form, FormInstance } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { cloneDeep } from 'lodash-es';
import React, { FC, useContext, useState } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes, WidgetFormEnum } from '../../constants';
import { DesignContext } from '../../store';
import { ActionType } from '../../store/action';
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

  const { sections, fields, formType } = state;

  const setFormType = (type: WidgetFormEnum, attr: Component) => {
    const cloneSections = cloneDeep(sections);
    const newSections = [...cloneSections, attr];
    if (type === WidgetFormEnum.SectionForm) {
      dispatch({
        type: ActionType.SET_FORM_TYPE,
        payload: { type, sections: newSections },
      });
    }
    // if (type === WidgetFormEnum.SingleForm) {
    //   dispatch({
    //     type: ActionType.SET_FORM_TYPE,
    //     payload: { type },
    //   });
    // }
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
          console.log('formType', state.formType);
          if (
            formType === WidgetFormEnum.SectionForm &&
            type === WidgetFormEnum.SectionForm
          ) {
            console.log('WidgetFormEnum', type);
            // const delta = monitor.getDifferenceFromInitialOffset();
            // const left = Math.round(delta.x);
            // const top = Math.round(delta.y);
            // console.log('方向', { top, left });
          } else {
            setFormType(type, other);
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
