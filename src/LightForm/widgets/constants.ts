// 枚举-视图控件别名
export const WidgetType = {
  text: 'Input',
  hidden: 'Hidden',
  dialpad: 'Dialpad',
  textarea: 'TextArea',
  groups: 'FormList',
  json: 'JsonField',

  number: 'InputNumber',
  currency: 'InputCurrency',
  discount: 'InputDiscount',
  counter: 'InputCounter',
  switch: 'Switch',

  cascader: 'Cascader',

  color: 'Color',

  date: {
    MD: 'Date_MD',
    YMD: 'Date_YMD',
    range: 'DateRange',
  },

  time: {
    HMS: 'TimePicker',
    HM: 'HSPicker',
    range: 'TimeRange',
  },

  select: {
    keymap: 'Select',
    simple: 'Select_Sim',
  },

  radio: {
    keymap: 'Radio',
    simple: 'Radio_Sim',
  },

  checkbox: {
    keymap: 'Checkbox',
    simple: 'Checkbox_Sim',
  },

  gender: {
    radio: 'Gender',
    checkbox: 'Gender_Checkbox',
  },

  region: {
    radio: 'Region',
    multiple: 'Region_Multi',
  },

  divider: 'Divider',
  content: 'Content',
};

// 映射词库-视图控件别名
export const WidgetName = {
  [WidgetType.text]: '文本',
  [WidgetType.hidden]: '隐藏字段',
  [WidgetType.dialpad]: '拨号盘',
  [WidgetType.textarea]: '文本域',

  [WidgetType.color]: '颜色选择',
  [WidgetType.number]: '数字',
  [WidgetType.currency]: '金额',
  [WidgetType.switch]: '开关',
  [WidgetType.date.YMD]: '年-月-日',
  [WidgetType.date.MD]: '月-日',
  [WidgetType.date.range]: '日期范围',
  [WidgetType.time.range]: '时间范围',

  [WidgetType.select.keymap]: '下拉列表',
  [WidgetType.select.simple]: '下拉列表',

  [WidgetType.radio.keymap]: '单选项',
  [WidgetType.radio.simple]: '单选项',

  [WidgetType.checkbox.keymap]: '多选项',
  [WidgetType.checkbox.simple]: '多选项',

  [WidgetType.gender.radio]: '性别', // 单选-性别; 取值已内置
  [WidgetType.gender.checkbox]: '性别', // 多选-性别; 取值已内置

  [WidgetType.divider]: '横向分割线', // 横向分割线
  [WidgetType.content]: '自定义视图',
};
