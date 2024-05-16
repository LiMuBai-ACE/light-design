import { LightSectionFormCardProps } from '@/LightForm/SectionForm';
import { FieldProps } from '@/LightForm/field/type';
import type { FormProps } from 'antd/es/form';

export const initState: State = {
  selectWidgetItem: undefined,
  formType: undefined,
  sections: [],
  fields: [],
  formConfig: {
    colon: true,
    labelCol: {},
    wrapperCol: {},
  },
};

export interface State {
  selectWidgetItem?: any;
  sections: LightSectionFormCardProps[];
  fields: FieldProps[];
  formConfig: FormProps;
  formType?: 'SingleForm' | 'SectionForm';
  [key: string]: any;
}
