import type { FormInstance, SelectProps } from 'antd';
import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

import { KeyMapProps } from './widgets/interface';

export interface SubmitProps {
  onSubmit?: (data: any) => Promise<any> | void;
  onValid?: (data: any) => void;
}

export const DefConfig = {
  content: { style: { flex: 1 } },
  label: { prefixCls: 'cube-form-label' },
  keymap: { value: 'value', label: 'label' } as KeyMapProps, // 选项控件的 key-value 映射
  filter: {
    filterMultiple: false,
    filterResetToDefaultFilteredValue: true,
    defaultFilteredValue: ['-1'],
  },
};

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

export interface FormCtxProps extends PropsWithChildren {
  form: FormInstance;
}

export const FormCtx = createContext<{
  form: FormInstance;
}>({
  form: {} as FormInstance,
});

export const useFormCtx = () => useContext(FormCtx);
