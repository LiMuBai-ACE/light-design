import type { FC, ReactNode } from 'react';
import React, { memo } from 'react';

import type { FormInstance } from 'antd';
import { Form } from 'antd';

import { isEmpty } from '@/utils';

import type { FormCtxProps } from './constants';
import { DefConfig, FormCtx, useFormCtx } from './constants';
import LightField from './field';
import { DateCheck, DisabledRules } from './rules';
import { WidgetName, WidgetType } from './widgets/constants';

import { ColProps } from 'antd/es';
import LightSectionForm, { LightSectionFormCardProps } from './SectionForm';
import LightSingleForm from './SingleForm';
import ReadonlyField from './field/components/readonly';
import { FieldProps } from './field/type';
import LightFormFooter from './footer';
import LightSearch from './search';
import ActionSearch from './search/action';

export { useFormCtx };

export {
  ActionSearch, // 搜索表单
  DateCheck,
  DisabledRules, // 文案-内置控件
  LightField, // 搜索表单-位于Tabel上方的 actions 位置
  LightSearch, // 字段套件-通用
  ReadonlyField, // 类型-内置控件
  WidgetName, // 禁用规则
  WidgetType,
};

/** @name FormWrapper */
export const FormWrapper = (props: FormCtxProps) => {
  const { form, children } = props;
  return <FormCtx.Provider value={{ form }}>{children}</FormCtx.Provider>;
};

export interface LightFormProps {
  /** 表单实例 */
  form?: FormInstance<any>;

  /** 是否只读 */
  readonly?: boolean;

  /** 布局方向，默认为水平 */
  layout?: 'horizontal' | 'vertical' | 'inline';

  /** 布局尺寸 - 标签 */
  labelCol?: ColProps;

  /** 布局尺寸 - 内容 */
  wrapperCol?: ColProps;

  /** Form 页脚按钮 */
  footer?: ReactNode[];

  /** Form 页脚 */
  footerRender?: ReactNode;

  /** footer是否固定页面底部 默认不固定 */
  isFixed?: boolean;

  /** SectionForm 视图区块模式 */
  sections?: LightSectionFormCardProps[];

  /** SimpleForm 简洁视图模式 */
  fields?: FieldProps[];

  /** 初始化 form values */
  initials?: any;

  /** 子元素 */
  children?: ReactNode;

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
    readonly,

    layout = 'horizontal',
    labelCol, // 布局尺寸-label
    wrapperCol, // 布局尺寸-content

    footer, // Form 页底
    footerRender, // Form 页底渲染
    isFixed, // footer是否固定页面底部
    sections = [], // 视图区块
    fields = [], // 简洁视图
    initials, // 初始化formvalues
    children,

    className,

    onValid,
    onSubmit,
    ...otherProps
  } = props;

  const empty = isEmpty(sections) && isEmpty(fields) && isEmpty(children);

  const [lightForm] = Form.useForm();
  const inst = form || lightForm;

  const attrs = {
    form: inst,
    layout,
    initialValues: initials,
    className,
    ...otherProps,
  };

  if (layout === 'horizontal') {
    Object.assign(attrs, {
      labelCol: labelCol || DefConfig.label,
      wrapperCol: wrapperCol || DefConfig.content,
    });
  }

  return (
    <FormWrapper form={inst}>
      <Form {...attrs}>
        <LightSectionForm sections={sections} />
        <LightSingleForm fields={fields} />
        {children}
        {!empty && footer !== null && (
          <LightFormFooter btns={footer} footerRender={footerRender} isFixed={isFixed} readonly={readonly} onValid={onValid} onSubmit={onSubmit} />
        )}
      </Form>
    </FormWrapper>
  );
};

export default memo(LightForm);
