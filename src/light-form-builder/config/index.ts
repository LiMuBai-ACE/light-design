import Icons from '@/assets/icons';

// 通用组件
const commonComponents: Component[] = [
  // {
  //   label: '按钮',
  //   type: 'Button',
  //   icon: Icons.Button,
  //   formConfig: {},
  //   layoutConfig: {},
  // },
];

const layoutComponents: Component[] = [
  {
    label: '分区表单',
    type: 'SectionForm',
    icon: Icons.SectionForm,
    formConfig: {
    },
    layoutConfig: {},
  },
  {
    label: '简洁表单',
    type: 'SingleForm',
    icon: Icons.SingleForm,
    formConfig: {

    },
    layoutConfig: {},
  },
];

// 数据录入
const dataEntryComponents: Component[] = [
  {
    label: '输入框',
    type: 'Input',
    icon: Icons.Input,
    formConfig: {
      defaultValue: '66666666',
    },
    layoutConfig: {},
  },
];

// 数据展示
const dataDisplayComponents: Component[] = [];

// 反馈
const feedbackComponents: Component[] = [];

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

export type Component = {
  key?: string;
  label: string;
  icon: string;
  type: string;
  formConfig?: Record<string, any>;
  layoutConfig?: Record<string, any>;
  [key: string]: unknown;
};

export type WidgetComponents = {
  title: string;
  components: Component[];
};
