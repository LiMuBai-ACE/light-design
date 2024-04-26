import type { CheckboxGroupProps as AntCheckboxGroupProps } from 'antd/es/checkbox';
import { NamePath } from 'antd/es/form/interface';

export { AntCheckboxGroupProps };

export type OptionProps = AntCheckboxGroupProps['options'];

export interface ErrorFieldItem {
  errors: string[];
  name: NamePath;
  warnings: string[];
}

export interface ValidateErrorRes {
  errorFields: ErrorFieldItem[];
  outOfDate: boolean;
  values: Record<string, any>;
}
