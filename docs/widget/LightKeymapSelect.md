---
nav:
  title: 组件
  order: 1
group: 组件
title: LightKeymapSelect - 下拉列表-Options使用映射模式
---

# LightKeymapSelect

## 使用场景

适用于需要使用映射模式下拉列表选项的场景。

## 代码演示

<code src='./demo/SelectPicker/LightKeymapSelect' title='代码'></code>

## API

### InputEmotions

| 属性        | 描述                | 是否必传 | 类型                                            | 默认值    |
| :---------- | :------------------ | :------- | :---------------------------------------------- | :-------- |
| hasAll      | 是否包含全部选项    | -        | `boolean`                                       | `false`   |
| options     | 下拉列表选项集合    | -        | `[{value:any,label:string}]`                    | -         |
| onChange    | 选项变化回调函数    | 是       | `(res: number \| string, options: any) => void` | -         |
| style       | 自定义样式          | -        | `CSSProperties`                                 | -         |
| width       | 宽度                | -        | `number \| string`                              | -         |
| mode        | 选择模式            | -        | `string`                                        | `default` |
| showSearch  | 是否显示搜索框      | -        | `boolean`                                       | `true`    |
| ...其他属性 | 与 antd Select 一致 | -        | -                                               | -         |

## 其他说明

--

## Tips

--
