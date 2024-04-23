import type { FC, Key } from 'react';
import React, { memo } from 'react';

import type { CardProps } from 'antd';
import { Form } from 'antd';

import { ClassName, isEmpty } from 'light-design/utils';

import { ConditionModel, FieldProps } from './field/type';

import type { FormCtxProps } from './constants';
import { DefConfig, FormCtx, useFormCtx } from './constants';
import { WidgetType, WidgetName } from './widgets/constants';
import { DisabledRules, DateCheck } from './rules';
import LightField from './field';

import FieldConditions from './field/components/conditions';

import LightSearch from './search';
import ActionSearch from './search/action';
import LightFormFooter from './footer';
import ReadonlyField from './widgets/readonly';
import Card from 'light-design/components/card';
import { Warnings } from 'light-design/components/warnings';

export {
  useFormCtx,
};

export {
  ActionSearch, // 搜索表单-位于Tabel上方的 actions 位置
  LightSearch, // 搜索表单
  DateCheck,
  DisabledRules, // 禁用规则
  WidgetType, // 类型-内置控件
  WidgetName, // 文案-内置控件
  LightField, // 字段套件-通用
  ReadonlyField,
};

interface FormSectionProps extends CardProps {
  key?: Key;
  warning?: string | string[];
  fields?: FieldProps[];
  conditions?: ConditionModel[];
}

export const FormSection = (props: FormSectionProps) => {
  const { title, extra, warning, fields = [], ...others } = props;

  return (
    <Card title={title} extra={extra} {...others}>
      <Warnings content={warning} />
      {LightField.each({ fields })}
    </Card>
  );
};

/** @name FormWrapper */
export const FormWrapper = (props: FormCtxProps) => {
  const { form, children } = props;
  return <FormCtx.Provider value={{ form }}>{children}</FormCtx.Provider>;
};


interface LightFormProps {
  /** 表单实例 */
  form: any;

  /** API 钩子 */
  apihook: any;

  /** 是否只读 */
  readonly: boolean;

  /** 布局方向，默认为水平 */
  layout?: 'horizontal' | 'vertical' | 'inline';

  /** 布局尺寸 - 标签 */
  labelCol?: object;

  /** 布局尺寸 - 内容 */
  wrapperCol?: object;

  /** Form 页脚 */
  footer?: [React.ReactNode];

  /** 视图区块 */
  sections?: any[];

  /** 初始化 form values */
  initials?: any;

  /** 子元素 */
  children?: React.ReactNode;

  /** 类名 */
  className?: string;

  /** 验证通过时的回调 */
  onValid?: (opt?: any | undefined) => Promise<any>;

  /** 提交表单时的回调 */
  onSubmit?: (data: any) => Promise<any> | void;

  /** 其他属性 */
  [key: string]: any;
}

const LightForm: FC<LightFormProps> = (props) => {
  const {
    form,
    apihook,
    readonly,

    layout = 'horizontal',
    labelCol, // 布局尺寸-label
    wrapperCol, // 布局尺寸-content

    footer, // Form 页底
    sections = [], // 视图区块

    initials, // 初始化formvalues
    children,

    className,

    onValid,
    onSubmit,
    ...otherProps
  } = props;

  const empty = isEmpty(sections) && isEmpty(children);

  const [customForm] = Form.useForm();
  const inst = form || customForm;

  const attrs = {
    form: inst,
    layout,
    initialValues: initials,
    className: ClassName.poly(['cube-form', className]),
    ...otherProps,
  };

  if (layout === 'horizontal') {
    Object.assign(attrs, {
      labelCol: labelCol || DefConfig.label,
      wrapperCol: wrapperCol || DefConfig.content,
    });
  }

  return (
    <FormWrapper form={inst} apihook={apihook}>
      <Form {...attrs}>
        {sections.map((section: FormSectionProps) => {
          const { key, conditions, ...others } = section;

          const mykey = (key || others?.title) as number | string;

          // 无前置条件的直接渲染
          if (!isEmpty(conditions)) {
            return (
              <FieldConditions key={mykey} conditions={conditions as ConditionModel[]}>
                <FormSection {...others} />
              </FieldConditions>
            );
          }

          return <FormSection key={mykey} {...others} />;
        })}
        {children}
        {!empty && footer !== null && (
          <LightFormFooter
            btns={footer} //
            readonly={readonly}
            onValid={onValid}
            onSubmit={onSubmit}
          />
        )}
      </Form>
    </FormWrapper>
  );
};

export default memo(LightForm);
