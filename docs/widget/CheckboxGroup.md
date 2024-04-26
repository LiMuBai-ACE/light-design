---
nav:
  title: 组件
  order: 2
group: 组件
title: CheckboxGroup-多选框组
---

# CheckboxGroup

## 使用场景

当需要让用户从多个选项中选择多个或者单个选项时，可以使用 CheckboxGroup 组件。它提供了一组复选框供用户选择，并可以自定义显示内容和样式。

## 代码演示

<code src='./demo/CheckboxGroup' title='使用'></code>

## API

### CheckboxGroup

| 属性          | 描述                                    | 是否必传 | 类型                                                                          | 默认值  |
| :------------ | :-------------------------------------- | :------- | :---------------------------------------------------------------------------- | :------ |
| options       | 多选框选项数组                          | 是       | `Array<{ value, label, extra? }>`                                             |
| value         | 选中的值数组                            | 否       | `Array<any>`                                                                  |
| loading       | 是否显示加载状态                        | 否       | `boolean`                                                                     | `false` |
| onChange      | 选中值变化的回调函数                    | 否       | `(val: Array<any>) => void`                                                   |
| onValueChange | 自定义监听控件变化的回调函数            | 否       | `(val: Array<any>, res: { prev: any, selected: Array<KeyMapProps> }) => void` |
| ...其他属性   | 其他属性与 antd Checkbox.Group 组件一致 | -        | -                                                                             |

## 其他说明

- 当 `loading` 为 `true` 时，会显示加载状态的 Spin 组件。
- 可以通过自定义 `onValueChange` 回调函数来监听控件变化并获取前一个值和当前选中的选项。

## Tips

- 在使用 CheckboxGroup 组件时，可以结合 Ant Design 的 Checkbox.Group 和 Spin 组件，实现多选框组的选择和加载状态的展示。
