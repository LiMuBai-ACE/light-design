import { DateInstance } from '@/utils';
import { SelectProps } from 'antd';

export type DateType = undefined | string | number | Date | DateInstance;

/** options 的 key-value 映射 */
export interface KeyMapProps {
  label: string;
  value: string;
  extra?: string;
}

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
        extra: ele?.[keymap?.extra as string] || ele?.extra,
        disabled: ele?.disabled || disabled,
      };
    });
  },
  filter: ((input, option) =>
    ((option?.label as string) ?? '')
      .toLowerCase()
      .includes(input.toLowerCase())) as SelectProps['filterOption'],
};
