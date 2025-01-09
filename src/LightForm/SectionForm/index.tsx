import type { CSSProperties, FC, Key } from 'react';
import React from 'react';

import type { CardProps } from 'antd';

import Card from '@/components/card';
import { Warnings } from '@/components/warnings';
import { isEmpty } from '@/utils';
import LightSingleForm from '../SingleForm';
import FieldConditions from '../field/components/conditions';
import { ConditionModel, FieldProps } from '../field/type';

export interface LightSectionFormCardProps extends CardProps {
  /** key需尽量传 */
  key?: Key;
  warning?: string | string[];
  widget?: any;
  fields?: FieldProps[];
  conditions?: ConditionModel[];
  style?: CSSProperties;
}

const LightSectionFormCard: FC<LightSectionFormCardProps> = (props) => {
  const { title, warning, fields = [], widget, extra, ...others } = props;

  return (
    <Card title={title} extra={extra} style={{ marginBottom: 20, ...props.style }} {...others}>
      <Warnings content={warning} />
      {widget || <LightSingleForm fields={fields} />}
    </Card>
  );
};

export interface LightSectionFormProps {
  sections: LightSectionFormCardProps[];
}

const LightSectionForm: FC<LightSectionFormProps> = (props) => {
  const { sections = [] } = props;

  if (isEmpty(sections)) return null;

  return sections.map((section: LightSectionFormCardProps) => {
    const { key, conditions, ...others } = section;

    const mykey = (key || others?.title) as number | string;

    // 无前置条件的直接渲染
    if (!isEmpty(conditions)) {
      return (
        <FieldConditions key={mykey} conditions={conditions as ConditionModel[]}>
          <LightSectionFormCard {...others} />
        </FieldConditions>
      );
    }

    return <LightSectionFormCard key={mykey} {...others} />;
  });
};

export default LightSectionForm;
