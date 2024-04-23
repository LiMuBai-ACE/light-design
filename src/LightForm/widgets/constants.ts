// 枚举-视图控件别名
export const WidgetType = {
  text: 'Input',
  hidden: 'Hidden',
  search: 'Search',
  dialpad: 'Dialpad',
  textarea: 'TextArea',
  groups: 'FormList',
  json: 'JsonField',

  number: 'InputNumber',
  currency: 'InputCurrency',
  discount: 'InputDiscount',
  counter: 'InputCounter',
  switch: 'Switch',

  cascader: {
    radio: 'Cascader_Radio',
    checkbox: 'Cascader_Checkbox',
  },

  upload: {
    file: 'Upload_File',
    media: 'Upload_Media',
  },

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

  image: 'ImagePicker',

  album: 'Album',
  area: 'AreaPicker',
  coupon: 'CouponsPicker',

  goods: 'GoodsPicker',
  store: 'storePicker',
  divider: 'Divider',
  content: 'Content',

  benefits: 'BenefitsPicker',
  people: 'PeoplePicker',
  taskgroup: 'TaskGroupPicker',
};

// 映射词库-视图控件别名
export const WidgetName = {
  [WidgetType.text]: '文本',
  [WidgetType.hidden]: '隐藏字段',
  [WidgetType.dialpad]: '拨号盘',
  [WidgetType.search]: '搜索框',
  [WidgetType.textarea]: '文本域',

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

  [WidgetType.image]: '素材库图片', // 选择器-素材库图片

  [WidgetType.region.radio]: '省-市-区', // 三级联动-地域 (单选)
  [WidgetType.region.multiple]: '省-市-区', // 三级联动-地域 (多选)
  [WidgetType.album]: '图片', // 选择器-上传图片

  [WidgetType.goods]: '商品', // 选择器-商品
  [WidgetType.coupon]: '优惠券', // 选择器-优惠券

  [WidgetType.benefits]: '会员权益', // 选择器-会员权益
  [WidgetType.people]: '客户人群', // 选择器-客户人群
  [WidgetType.taskgroup]: '任务分组', // 选择器-客户人群

  [WidgetType.divider]: '横向分割线', // 横向分割线
  [WidgetType.content]: '自定义视图',
};
