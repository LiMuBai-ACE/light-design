import type { SelectProps } from 'antd';

import { KeyMapProps } from '../LightForm/widgets/interface';

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

interface OptionMethodType {
  options: (params: {
    disabled?: boolean;
    options?: any[];
    keymap: KeyMapProps;
  }) => any[];
  filter: SelectProps['filterOption'];
}

export const OptionMethod: OptionMethodType = {
  options: (params: {
    disabled?: boolean;
    options?: any[];
    keymap: KeyMapProps;
  }) => {
    const { disabled, keymap, options } = params;

    let list = options || [];

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
    ((option?.label as string) ?? '')
      .toLowerCase()
      .includes(input.toLowerCase())) as SelectProps['filterOption'],
};
