---
nav:
  title: 组件
  order: 1
group: 组件
title: DateRangePicker - 日期区间选择器
---

# LightDateRangePicker

## 使用场景

在需要选择日期区间的地方使用。

## 代码演示

<code src='./demo/LightDatePicker/LightDateRangePicker' title='使用'></code>

## API

### LightDateRangePicker

| 属性        | 描述                                | 是否必传 | 类型                         | 默认值 |
| :---------- | :---------------------------------- | :------- | :--------------------------- | :----- |
| value       | 当前选择的日期区间                  | -        | `DateType[]`                 | -      |
| showTime    | 是否显示时间选择器                  | -        | `boolean`                    | -      |
| width       | 宽度                                | -        | `number \| string`           | `100%` |
| onChange    | 日期区间变化回调函数                | -        | `(range?: string[]) => void` | -      |
| ...其他属性 | 与 antd DatePicker.RangePicker 一致 | -        | -                            | -      |

## 其他说明

--

## Tips

--
