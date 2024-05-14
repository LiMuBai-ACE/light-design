---
nav:
  title: 组件
  order: 1
group: 组件
title: InputEmotions - 带表情输入框
---

# LightInputEmotions

## 使用场景

在需要输入文本并选择表情的地方使用。

> ps: 此组件在文档上宽度会超出屏幕，所以外层加了 div 做限制。正常使用可以把外层 div 删除

## 代码演示

<code src='./demo/LightInput/LightInputEmotions' ></code>

## API

### LightInputEmotions

| 属性        | 描述       | 是否必传 | 类型                          | 默认值                           |
| :---------- | :--------- | :------- | :---------------------------- | :------------------------------- |
| emotions    | 表情数组   | -        | `any[]`                       | -                                |
| value       | 值         | -        | `string`                      | -                                |
| width       | input 宽度 | -        | `string \| number`            | `父元素宽度 - emoji图标 - 间距8` |
| onChange    | 操作       | -        | `(value:string \| undefined)` | -                                |
| placeholder | 占位符     | -        | `string`                      | -                                |

## 其他说明

--

## Tips

--
