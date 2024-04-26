import { LightForm, LightFormProps } from 'light-design';
import { WidgetType } from 'light-design/LightForm/widgets/constants';
import React from 'react';

const Page = () => {
  const attr: LightFormProps = {
    sections: [
      {
        title: '111',
        fields: [
          {
            name: 'name',
            label: '名字',
            widget: {
              widget: WidgetType.text,
            },
          },
        ],
      },
    ],
  };

  return <LightForm {...attr} />;
};

export default Page;
