import React from 'react';

import { FieldProps } from './type';

import FieldItem from './components/field';

/** @name LightField 字段域套件 */
const LightField = ({ field }: { field: FieldProps }) => {
  return <FieldItem field={field as FieldProps} />;
};

export default LightField;
