import { LightField } from '@/LightForm';
import { LightSingleFormProps } from '@/LightForm/SingleForm';
import { isEmpty } from '@/utils';
import React, { FC } from 'react';
import './index.less';

const SingleForm: FC<LightSingleFormProps> = (props) => {
  const { fields: sectionFields = [] } = props;
  const fields = sectionFields || [];
  return (
    <div className="widget-fields-container">
      {fields.map((field) => (
        <LightField field={field} key={field.name} />
      ))}
      {isEmpty(fields) ? (
        <div className="widget-fields-empty">从左侧拖拽来添加字段</div>
      ) : null}
    </div>
  );
};

export default SingleForm;
