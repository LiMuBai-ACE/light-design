---
nav:
  title: 组件
  order: 1
group: 组件
title: TimeRangePicker - 轻量级时间选择器
---

# LightTimeRangePicker

## 使用场景

在需要使用一个轻量级的时间段选择器的地方使用。

## 代码演示

<code src='./demo/LightTimePicker/LightTimeRangePicker' title='使用示例'></code>

## API

### LightTimeRangePicker

| 属性     | 描述             | 是否必传 | 类型                         | 默认值     |
| :------- | :--------------- | :------- | :--------------------------- | :--------- |
| disabled | 是否禁用         | -        | `boolean`                    | -          |
| format   | 时间格式         | -        | `string`                     | `HH:mm:ss` |
| width    | 宽度             | -        | `number \| string`           | -          |
| style    | 样式             | -        | `React.CSSProperties`        | -          |
| value    | 时间值           | -        | `DateInstance[]`             | -          |
| onChange | 时间变化回调函数 | -        | `(newval: string[]) => void` | -          |

## 其他说明

- `LightTimeRangePicker`组件是基于`Ant Design`的`TimePicker.RangePicker`组件封装而成的轻量级时间选择器。
- 可以根据需要定制化时间格式、宽度等属性。

## Tips

--
