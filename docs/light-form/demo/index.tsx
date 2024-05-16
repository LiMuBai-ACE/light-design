import LightForm, { LightFormProps, WidgetType } from 'light-design/LightForm';
import React from 'react';

const Page = () => {
  const attr: LightFormProps = {
    onSubmit: (formdata) => {
      console.log('formdata', formdata);
    },
    initials: {
      name: '111',
      list: [{}],
    },
    isFixed: true,
    // sections: [
    //   {
    //     title: '111',
    //     fields: [
    //       {
    //         name: 'name',
    //         label: '名字',
    //       },
    //       {
    //         name: 'list',
    //         // label: '列表',
    //         // disabled: true,
    //         widget: {
    //           widget: WidgetType.groups,
    //           fields: [
    //             {
    //               name: 'name',
    //               label: '名字',
    //               widget: {
    //                 widget: WidgetType.text,
    //               },
    //             },
    //             {
    //               name: 'select',
    //               label: '选择',
    //               widget: {
    //                 widget: WidgetType.select,
    //                 options: ['a', 'b', 'c'],
    //                 hasAll: true,
    //               },
    //             },
    //           ],
    //         },
    //       },

    //       {
    //         name: 'obj',
    //         label: '对象',
    //         // disabled: true,
    //         widget: {
    //           widget: WidgetType.json,
    //           fields: [
    //             {
    //               name: 'name',
    //               label: '名字',
    //               widget: {
    //                 widget: WidgetType.text,
    //               },
    //             },
    //             {
    //               name: 'select',
    //               label: '选择',
    //               widget: {
    //                 widget: WidgetType.select,
    //                 options: ['a', 'b', 'c'],
    //                 hasAll: true,
    //               },
    //             },
    //           ],
    //         },
    //       },
    //     ],
    //   },
    // ],
    fields: [
      {
        name: 'name',
        label: '名字',
      },
      {
        name: 'list',
        // label: '列表',
        // disabled: true,
        widget: {
          widget: WidgetType.groups,
          fields: [
            {
              name: 'name',
              label: '名字',
              widget: {
                widget: WidgetType.text,
              },
            },
            {
              name: 'select',
              label: '选择',
              widget: {
                widget: WidgetType.select,
                options: ['a', 'b', 'c'],
                hasAll: true,
              },
            },
          ],
        },
      },

      {
        name: 'obj',
        label: '对象',
        // disabled: true,
        widget: {
          widget: WidgetType.json,
          fields: [
            {
              name: 'name',
              label: '名字',
              widget: {
                widget: WidgetType.text,
              },
            },
            {
              name: 'select',
              label: '选择',
              widget: {
                widget: WidgetType.select,
                options: ['a', 'b', 'c'],
                hasAll: true,
              },
            },
          ],
        },
      },
    ],
  };

  return <LightForm {...attr} />;
};

export default Page;
