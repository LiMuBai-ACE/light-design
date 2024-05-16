import { isEmpty } from '@/utils';
import { FC } from 'react';
import LightField from '../field';
import { FieldProps } from '../field/type';

export interface LightSingleFormProps {
  fields: FieldProps[];
}

const LightSingleForm: FC<LightSingleFormProps> = (props) => {
  const { fields = [] } = props;

  if (isEmpty(fields)) return null;

  return LightField.each({ fields });
};

export default LightSingleForm;
