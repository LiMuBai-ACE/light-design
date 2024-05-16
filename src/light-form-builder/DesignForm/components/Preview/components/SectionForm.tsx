import {
  LightSectionFormCardProps,
  LightSectionFormProps,
} from '@/LightForm/SectionForm';
import Card from '@/components/card';
import { Warnings } from '@/components/warnings';
import React, { FC } from 'react';
import SingleForm from './SingleForm';

const SectionCardForm: FC<LightSectionFormCardProps> = (props) => {
  const { title, warning, fields = [], extra, ...others } = props;
  return (
    <Card
      title={title}
      extra={extra}
      style={{ marginBottom: 20, ...props.style }}
      {...others}
    >
      <Warnings content={warning} />
      <SingleForm fields={fields} />
    </Card>
  );
};

const SectionForm: FC<LightSectionFormProps> = (props) => {
  const { sections = [] } = props;

  return sections.map((section: LightSectionFormCardProps) => {
    const { key, ...others } = section;

    const mykey = (key || others?.title) as number | string;

    return <SectionCardForm key={mykey} {...others} />;
  });
};

export default SectionForm;
