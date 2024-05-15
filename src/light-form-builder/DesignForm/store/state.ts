import type { FormProps } from 'antd/es/form';

export const initState: State = {
  selectWidgetItem: undefined,
  widgetList: [],
  formConfig: {
    colon: true,
    labelCol: {},
    wrapperCol: {},
  },
};

export interface State {
  selectWidgetItem?: any;
  widgetList: any[];
  formConfig: FormProps;
  [key: string]: any;
}
