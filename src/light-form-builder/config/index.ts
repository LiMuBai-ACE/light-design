import Icons from '@/assets/icons';
import { ReactNode } from 'react';
import { WidgetFormEnum } from '../DesignForm/constants';

// 通用组件
const commonComponents: LightFieldComponent[] = [
  // {
  //   label: '按钮',
  //   widget: 'Button',
  //   icon: Icons.Button,
  //   form_config: {},
  //   layout_config: {},
  // },
];

export enum WidgetTypeEnum {
  // 分区表单
  SectionForm = WidgetFormEnum.SectionForm,
  // 简单表单
  SingleForm = WidgetFormEnum.SingleForm,

  // 数组容器
  Groups = 'FormList',
  // 对象容器
  Json = 'JsonField',

  // 输入框
  Input = 'Input',
  // 数字输入框
  InputNumber = 'InputNumber',
  // 选择器
  Select = 'Select',
  // 单选框
  Radio = 'Radio',
  // 多选框
  Checkbox = 'Checkbox',
}

const layoutComponents: LightFieldComponent[] = [
  {
    label: '分区表单',
    widget: WidgetTypeEnum.SectionForm,
    icon: Icons.SectionForm,
    config: {
      field: [
        {
          label: 'Key',
          name: 'key',
          tips: '分区表单唯一标识',
        },
        {
          label: '标题',
          name: 'title',
          tips: '分区表单标题',
        },
      ],
    },
  },
  {
    label: '简洁表单',
    widget: WidgetTypeEnum.SingleForm,
    icon: Icons.SingleForm,
  },
  {
    label: '数组容器',
    icon: 'groups',
    widget: {
      widget: WidgetTypeEnum.Groups,
      fields: [
        {
          label: 'Key',
          name: 'key',
          tips: '数组容器唯一标识',
        },
        {
          label: '标题',
          name: 'title',
          tips: '数组容器标题',
        },
      ],
    },
  },
  {
    label: '对象容器',
    icon: 'json',
    widget: {
      widget: WidgetTypeEnum.Json,
      fields: [
        {
          label: 'Key',
          name: 'key',
          tips: '数组容器唯一标识',
        },
        {
          label: '标题',
          name: 'title',
          tips: '数组容器标题',
        },
      ],
    },
  },
];

// 数据录入
const dataEntryComponents: LightFieldComponent[] = [
  {
    label: '输入框',
    widget: WidgetTypeEnum.Input,
    icon: Icons.Input,
    form_config: {},
    layout_config: {},
  },
  {
    label: '数字输入框',
    widget: WidgetTypeEnum.InputNumber,
    icon: Icons.InputNumber,
    form_config: {},
    layout_config: {},
  },
  {
    label: '选择器',
    widget: WidgetTypeEnum.Select,
    icon: Icons.Select,
    form_config: {},
    layout_config: {},
  },
  {
    label: '单选框',
    widget: WidgetTypeEnum.Radio,
    icon: Icons.Radio,
    form_config: {},
    layout_config: {},
  },
  {
    label: '多选框',
    widget: WidgetTypeEnum.Checkbox,
    icon: Icons.Checkbox,
    form_config: {},
    layout_config: {},
  },
];

// 数据展示
const dataDisplayComponents: LightFieldComponent[] = [];

// 反馈
const feedbackComponents: LightFieldComponent[] = [];

export const widgetComponents: WidgetComponents[] = [
  {
    title: '通用组件',
    components: commonComponents,
  },
  {
    title: '布局组件',
    components: layoutComponents,
  },
  {
    title: '数据录入',
    components: dataEntryComponents,
  },
  {
    title: '数据展示',
    components: dataDisplayComponents,
  },
  {
    title: '反馈',
    components: feedbackComponents,
  },
];

export interface Widget {
  widget: WidgetTypeEnum;
  fields?: any[];
  field?: any;
}

export type LightFieldComponent = {
  key?: string;
  currentIndex?: number;
  label: ReactNode | string;
  icon: string;
  widget: WidgetTypeEnum | Widget;
  config?: Record<string, any>;
  [key: string]: any;
};

export type WidgetComponents = {
  title: string;
  components: LightFieldComponent[];
};
