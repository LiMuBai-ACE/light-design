import type { SelectProps } from 'antd';
import { KeyMapProps } from 'light-design/form/type';



import { isEmpty, JsonExtend } from 'light-design/utils';



export interface SubmitProps {
  onSubmit: (data: any) => Promise<any> | void;
  onValid?: (data: any) => void;
}


export const DefOptions = {
  all: { value: -1, label: '全部' },
  gender: [
    { value: 'male', label: '男' },
    { value: 'female', label: '女' },
  ],
};

export const OptionMethod = {
  options: (params: { disabled?: boolean; options?: any[]; keymap: KeyMapProps; mappings: Record<string, any> }) => {
    const { disabled, keymap, options, mappings } = params;

    let list = options || [];

    if (!isEmpty(mappings)) {
      list = JsonExtend.json2arr(mappings);
    }

    return list.map((ele) => {
      return {
        label: ele?.[keymap?.label] || ele,
        value: ele?.[keymap?.value] || ele,
        extra: ele?.[keymap?.extra as string],
        disabled: ele?.disabled || disabled,
      };
    });
  },
  filter: ((input, option) =>
    ((option?.label as string) ?? '').toLowerCase().includes(input.toLowerCase())) as SelectProps['filterOption'],
};

