import Icons from '@/assets/icons';

// 通用组件
const commonComponents: LightFieldComponent[] = [
  // {
  //   label: '按钮',
  //   widget_type: 'Button',
  //   icon: Icons.Button,
  //   form_config: {},
  //   layout_config: {},
  // },
];

const layoutComponents: LightFieldComponent[] = [
  {
    label: '分区表单',
    widget_type: 'SectionForm',
    icon: Icons.SectionForm,
    form_config: {},
    layout_config: {},
  },
  {
    label: '简洁表单',
    widget_type: 'SingleForm',
    icon: Icons.SingleForm,
    form_config: {},
    layout_config: {},
  },
];

// 数据录入
const dataEntryComponents: LightFieldComponent[] = [
  {
    label: '输入框',
    widget_type: 'Input',
    icon: Icons.Input,
    form_config: {
      defaultValue: '66666666',
    },
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
  widget_type?: string;
  form_config?: Record<string, any>;
  layout_config?: Record<string, any>;
  [key: string]: any;
};

export type WidgetComponents = {
  title: string;
  components: LightFieldComponent[];
};
