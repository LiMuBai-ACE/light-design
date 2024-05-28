import { LightSectionFormCardProps } from '@/LightForm/SectionForm';
import { FieldProps } from '@/LightForm/field/type';
import type { FormProps } from 'antd/es/form';
import { WidgetFormEnum } from '../constants';

export const initState: State = {
  selectWidgetItem: undefined,
  formType: undefined,
  sections: [],
  fields: [],
  form_config: {
    colon: true,
    labelCol: {},
    wrapperCol: {},
  },
};

export interface State {
  selectWidgetItem?: any;
  sections: LightSectionFormCardProps[];
  fields: FieldProps[];
  form_config: FormProps;
  formType?: WidgetFormEnum;
  [key: string]: any;
}
