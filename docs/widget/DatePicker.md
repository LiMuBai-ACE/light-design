---
nav:
  title: 组件
  order: 1
group: 组件
title: DatePicker - 日期选择器
---

# DatePicker

## 使用场景

需要在应用中选择日期的地方使用。

## 代码演示

<code src='./demo/DatePicker' title='代码'></code>

## API

### DatePicker

| 属性        | 描述                    | 是否必传 | 类型                                   | 默认值              |
| :---------- | :---------------------- | :------- | :------------------------------------- | :------------------ |
| value       | 当前日期值              | 否       | `DateInstance  \| undefined`           | -                   |
| onChange    | 日期值变化回调函数      | 否       | `(value: string \| undefined) => void` | -                   |
| style       | 自定义样式              | -        | `CSSProperties`                        | -                   |
| width       | 宽度                    | -        | `string`                               | `100%`              |
| format      | 日期格式                | -        | `TimeFormat`                           | `TimeFormat.common` |
| showTime    | 是否显示时间选择        | -        | `boolean`                              | `true`              |
| ...其他属性 | 与 antd DatePicker 一致 | -        | -                                      | -                   |

## 其他说明

待调试

## Tips

--
