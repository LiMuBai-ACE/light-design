import { LightSectionFormCardProps } from '@/LightForm/SectionForm';
import { LightFieldComponent, WidgetTypeEnum } from '@/light-form-builder/config';
import type { FormProps } from 'antd/es/form';

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

export type FieldSection = LightSectionFormCardProps & LightFieldComponent;

export interface State {
  selectWidgetItem?: FieldSection;
  sections: FieldSection[];
  fields: LightFieldComponent[];
  form_config: FormProps;
  formType: WidgetTypeEnum.SectionForm | WidgetTypeEnum.SingleForm | undefined;
  [key: string]: any;
}

export interface CommonProviderProps {
  children: React.ReactNode;
}
