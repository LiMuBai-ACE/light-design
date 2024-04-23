import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';
import type { FormInstance, SelectProps } from 'antd';

import { isEmpty, JsonExtend } from 'light-design/utils';

import { KeyMapProps } from './type';

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

interface Option<T> {
  label: string | undefined;
  value: T;
  extra?: any;
  disabled?: boolean;
}

type OptionsMethod<T> = {
  options: (params: {
    disabled?: boolean;
    options?: T[];
    keymap: KeyMapProps;
    mappings: Record<string, T>;
  }) => Option<T>[];
  filter: SelectProps['filterOption'];
};

export const OptionMethod: OptionsMethod<any> = {
  options: ({ disabled = false, keymap, options = [], mappings }) => {
    let list = options;

    if (!isEmpty(mappings)) {
      list = JsonExtend.json2arr(mappings);
    }

    return list.map((ele) => ({
      label: ele?.[keymap?.label] ?? String(ele),
      value: ele?.[keymap?.value] ?? ele,
      extra: ele?.[keymap?.extra as keyof typeof ele],
      disabled: ele?.disabled ?? disabled,
    }));
  },
  filter: ((input, option) =>
    (option?.label as string)?.toLowerCase().includes(input.toLowerCase())) as SelectProps['filterOption'],
};




export interface FormCtxProps extends PropsWithChildren {
  form: FormInstance;
  apihook: Record<string, any>;
}

export const FormCtx = createContext<{
  form: FormInstance;
}>({
  form: {} as FormInstance,
});

export const useFormCtx = () => useContext(FormCtx);
