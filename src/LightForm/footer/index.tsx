import { Button, ButtonProps, Col, Row } from 'antd';
import React, { FC, ReactNode, isValidElement, useState } from 'react';

import { JsonExtend, isEmpty, isFunction } from '@/utils';

import { SubmitProps, useFormCtx } from '../constants';
import LayoutFooter from './layoutFooter';

interface LightFormFooterProps extends SubmitProps {
  disabled?: boolean;
  readonly?: boolean;
  btns?: null | ReactNode[];
  footerRender?: ReactNode;
  /** footer是否固定 默认false */
  isFixed?: boolean;
}

export const CommonButton = (props: ButtonProps) => {
  const { children, ...others } = props;

  return <Button {...others}>{children}</Button>;
};

export const ResetButton = (props: ButtonProps) => {
  const { children, ...others } = props;
  const { form } = useFormCtx();

  const reset = () => {
    form.resetFields();
  };

  return (
    <CommonButton {...others} onClick={reset}>
      {children}
    </CommonButton>
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

interface FooterContainerProps {
  isFixed?: boolean;
  children: ReactNode;
  [key: string]: any;
}
const FooterContainer: FC<FooterContainerProps> = (props) => {
  const { isFixed, children, ...other } = props;
  if (isFixed) {
    return <LayoutFooter {...other}>{children}</LayoutFooter>;
  }
  return (
    // <Form.Item>
    <Row {...other}>{props.children}</Row>
    // </Form.Item>
  );
};

const LightFormFooter: FC<LightFormFooterProps> = (props) => {
  const { disabled, btns, readonly, onSubmit, onValid, footerRender, isFixed } =
    props;

  if (btns === null || isValidElement(footerRender)) {
    return null;
  }

  const buttonList = [
    { key: 'reset', node: <ResetButton>重置</ResetButton> },
    {
      key: 'save',
      node: (
        <FormSubmit disabled={disabled} onSubmit={onSubmit} onValid={onValid}>
          保存
        </FormSubmit>
      ),
    },
  ];

  const renderButtons = () => {
    if (isValidElement(footerRender)) {
      return footerRender;
    }

    if (!isEmpty(btns)) {
      return (btns || []).map((ele: any, index: number) => (
        <Col key={`${index + 1}`}>{ele}</Col>
      ));
    }

    if (readonly) {
      return <CommonButton disabled={false}>返回</CommonButton>;
    }

    return buttonList.map((ele: any) => <Col key={ele.key}>{ele.node}</Col>);
  };

  const attr = {
    gutter: [8, 0],
    justify: 'end',
    isFixed,
  };
  return <FooterContainer {...attr}>{renderButtons()}</FooterContainer>;
};

export default LightFormFooter;
