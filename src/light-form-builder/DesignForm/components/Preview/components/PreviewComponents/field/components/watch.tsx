import { Form, FormInstance } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { Fragment, cloneElement, isValidElement, useEffect } from 'react';

import { isEmpty } from '@/utils';

import { ConditionExtend } from '../constants';
import { WartchConfig, WatchFragmentProps } from '../type';

/** @name WatchFragment 观察者片段 */
const WatchFragment = (props: WatchFragmentProps) => {
  const { name, form, observed, watch } = props;

  const onChange = (value: any) => {
    form.setFields([{ name, value }]);
  };

  useEffect(() => {
    const { callback, become } = watch;

    if (become) {
      onChange(become({ observed }));
    }

    if (callback) {
      callback({ observed, form, name, onChange });
    }
  }, [observed]);

  return null;
};

const listkey = (args: NamePath | NamePath[]) => {
  if (typeof args === 'string') {
    return args;
  }
  if (Array.isArray(args)) {
    return args.join('').replace(/\/,/g, '');
  }
  return '';
};

WatchFragment.each = (params: { name: NamePath; watch: WartchConfig[]; form: FormInstance }) => {
  const { name, watch, form } = params;

  return watch.map((ele: WartchConfig) => {
    // 单字段观测
    if (ele.name) {
      const key = listkey(ele.name);
      const observed = form.getFieldValue(ele.name as NamePath);
      const attrs = { key, name, form, observed };
      return <WatchFragment {...attrs} watch={ele} key={key} />;
    }
    // 多字段观测
    const { namelist } = ele;
    const key = listkey(namelist as NamePath[]);
    const observed = form.getFieldsValue(namelist as NamePath[]);
    const attrs = { name, form, observed };
    return <WatchFragment key={key} {...attrs} watch={ele} />;
  });
};

/** @name FieldWatch 字段观察者 */
export default (props: any) => {
  const { name, watch, dependencies, children } = props;

  /** dependencies 模式 */

  if (dependencies) {
    return (
      <Form.Item noStyle dependencies={dependencies}>
        {(forminst) => {
          const names = ConditionExtend.fields({ dependencies });
          const observed = forminst.getFieldsValue(names as NamePath[]);
          return cloneElement(children, { observed });
        }}
      </Form.Item>
    );
  }

  /** watch 模式 */

  const namelist = ConditionExtend.fields({ watch }) as NamePath[];

  if (isEmpty(namelist)) {
    console.error('namelist 不能为空, 请传入 NamePath[]');
    return null;
  }

  // 监听指定的字段值, 当发生变化时通知下级节点更新
  const onCompare = (prev: any, current: any) => {
    const options = { prev, current, namelist };
    return ConditionExtend.compare(options);
  };

  return (
    <Form.Item noStyle shouldUpdate={onCompare}>
      {(forminst) => {
        const form = forminst as FormInstance;

        const fragments = WatchFragment.each({ form, name, watch });

        if (isValidElement(children)) {
          const observed = form.getFieldsValue(namelist);
          return (
            <Fragment>
              {fragments}
              {cloneElement(children, { observed } as any)}
            </Fragment>
          );
        }

        return (
          <Fragment>
            {fragments}
            {children}
          </Fragment>
        );
      }}
    </Form.Item>
  );
};
