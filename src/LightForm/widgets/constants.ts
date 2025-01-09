// 枚举-视图控件别名
export enum WidgetType {
  hidden = 'Hidden',
  dialpad = 'Dialpad',
  textarea = 'TextArea',
  groups = 'FormList',
  json = 'JsonField',

  number = 'InputNumber',
  currency = 'InputCurrency',
  discount = 'InputDiscount',
  counter = 'InputCounter',
  switch = 'Switch',

  cascader = 'Cascader',

  color = 'Color',
  date_MD = 'Date_MD',
  date_YMD = 'Date_YMD',
  date_range = 'DateRange',

  time_HMS = 'TimePicker',
  time_HM = 'HSPicker',
  time_range = 'TimeRange',

  select = 'Select',

  radio = 'Radio',

  checkbox = 'Checkbox',
}

// 映射词库-视图控件别名
export const WidgetName = {
  [WidgetType.hidden]: '隐藏字段',
  [WidgetType.dialpad]: '拨号盘',
  [WidgetType.textarea]: '文本域',

  [WidgetType.color]: '颜色选择',
  [WidgetType.number]: '数字',
  [WidgetType.currency]: '金额',
  [WidgetType.switch]: '开关',
  [WidgetType.date_YMD]: '年-月-日',
  [WidgetType.date_MD]: '月-日',
  [WidgetType.date_range]: '日期范围',
  [WidgetType.time_HMS]: '时间选择器',
  [WidgetType.time_HM]: '时分选择器',
  [WidgetType.time_range]: '时间范围',

  [WidgetType.select]: '下拉列表',

  [WidgetType.radio]: '单选项',

  [WidgetType.checkbox]: '多选项',
};
