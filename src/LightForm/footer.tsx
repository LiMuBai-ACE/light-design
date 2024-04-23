import React, { ReactNode, useState } from 'react';
import { Button, ButtonProps, Col, Row } from 'antd';

import { JsonExtend, isEmpty, isFunction } from 'light-design/utils';

import { SubmitProps, useFormCtx } from './constants';

interface MyProps extends SubmitProps {
  disabled?: boolean;
  readonly?: boolean;
  btns?: null | ReactNode[];
}

export const HistoryBack = (props: ButtonProps) => {
  const { children, ...others } = props;

  return (
    <Button {...others}>
      {children}
    </Button>
  );
};

export const FormSubmit = (props: ButtonProps & SubmitProps) => {
  const { children, disabled, onValid, onSubmit } = props;

  const [loading, setLoading] = useState(false);

  const { form } = useFormCtx();

  const attrs = {
    loading, //
    disabled: disabled || loading,
  };

  const onAction = async () => {
    try {
      let formdata = await form.validateFields();
      formdata = JsonExtend.trim(formdata); // 去除值为undefined的数据

      if (isFunction(onSubmit)) {
        setLoading(true);
        await onSubmit(formdata);
        setLoading(false);
      }
    } catch (res: any) {
      if (!isEmpty(res?.errorFields)) {
        onValid?.(res);
        form.scrollToField(res?.errorFields[0].name, {
          behavior: 'smooth',
          scrollMode: 'if-needed',
          block: 'center',
        });
      }
    }
  };

  return (
    <Button type="primary" {...attrs} onClick={onAction}>
      {children}
    </Button>
  );
};

/**
 * @name LightFormFooter
 * */
export default (props: MyProps) => {
  const { disabled, btns, readonly, onSubmit, onValid } = props;


  if (btns === null) {
    return null;
  }

  if (!isEmpty(btns)) {
    return (
      <Row gutter={[8, 0]} justify="end">
        {(btns || []).map((ele: any, index: number) => (
          <Col key={`${index + 1}`}>{ele}</Col>
        ))}
      </Row>
    );
  }

  // 只读页面, 仅显示返回按钮
  if (readonly) {
    return (
      <Row justify="end">
        <HistoryBack disabled={false}>返回</HistoryBack>
      </Row>
    );
  }

  const submit = { disabled, onSubmit, onValid };

  const btnlist = [
    { key: 'back', node: <HistoryBack>取消</HistoryBack> }, // 取消
    { key: 'save', node: <FormSubmit {...submit}>保存</FormSubmit> },
  ];

  return (
    <Row gutter={8} justify="end">
      {btnlist.map((ele: any) => (
        <Col key={ele.key}>{ele.node}</Col>
      ))}
    </Row>
  );
};
