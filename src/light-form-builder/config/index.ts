import Icons from '@/assets/icons';
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
  // 输入框
  Input = 'Input',
  // 数字输入框
  InputNumber = 'InputNumber',
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

export type LightFieldComponent = {
  key?: string;
  currentIndex?: number;
  label: string;
  icon: string;
  widget: WidgetTypeEnum;
  config?: Record<string, any>;
  [key: string]: any;
};

export type WidgetComponents = {
  title: string;
  components: LightFieldComponent[];
};
