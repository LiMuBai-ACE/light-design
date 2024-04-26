import {
  CloseCircleFilled,
  LoadingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import type { SearchProps } from 'antd/es/input';
import React, { Key, forwardRef, useImperativeHandle, useMemo } from 'react';

import { ClassName, isEmpty, sleep } from '@/utils';

import './index.less';

export interface SearchBarRef {
  clear: () => void;
}

interface BaseProps extends Pick<SearchProps, 'loading' | 'placeholder'> {
  width?: number;
  onSearch?: (data: Record<string, string>) => void;
}

interface InputSearchProps extends BaseProps {
  name: string;
  value?: string;
}

interface OptionsSearchProps extends BaseProps {
  data: Record<string, Key>;
  options: { value: Key; label: string }[];
}

const ClearAction = (props: any) => {
  const { form, ...others } = props;
  const value = Form.useWatch('value', { form, preserve: true });
  return !!value && <CloseCircleFilled className="clear" {...others} />;
};

function SearchBar(props: InputSearchProps | OptionsSearchProps, ref?: any) {
  const { loading, placeholder, width, onSearch } = props;

  const { name, value } = props as InputSearchProps;
  const { data, options } = props as OptionsSearchProps;

  const [form] = Form.useForm();
  const _name = Form.useWatch('name', { form, preserve: true });

  const clear = async () => {
    await sleep(50);
    form.setFieldValue('value', '');
  };

  const onClear = async () => {
    !loading && onSearch?.({ [_name]: '' });
    clear();
  };

  useImperativeHandle(ref, () => {
    return { clear };
  });

  const empty = !options || isEmpty(options);

  const _placeholder = useMemo(() => {
    if (empty) {
      return placeholder;
    }

    const selected = options.find((ele) => ele.value === _name) || options[0];

    return '请输入' + (selected?.label as string);
  }, [empty, _name]);

  const attrs = useMemo(() => {
    const initials = {};

    if (empty) {
      Object.assign(initials, { name, value });
    } else if (!data || isEmpty(data)) {
      Object.assign(initials, { name: options?.[0]?.value, value: '' });
    } else {
      const selected =
        options.find((ele) => data.hasOwnProperty(String(ele.value))) ||
        options[0];
      Object.assign(initials, {
        name: selected.value,
        value: data[selected.value as string],
      });
    }

    return { form, initialValues: initials };
  }, []);

  const onSubmit = async () => {
    if (!loading) {
      const data = await form.validateFields();
      onSearch?.({ [data.name]: data.value });
    }
  };

  const icon = (
    <Button onClick={onSubmit}>
      {loading ? <LoadingOutlined /> : <SearchOutlined />}
    </Button>
  );

  const menus = (
    <Form.Item noStyle name="name">
      {empty ? <span /> : <Select options={options} />}
    </Form.Item>
  );

  return (
    <Form {...attrs}>
      <Form.Item noStyle name="value">
        <Input
          style={{ width: width || 320 }}
          addonAfter={icon}
          addonBefore={menus}
          className={ClassName.setup({
            search: true,
            'options-search': !empty,
          })}
          placeholder={_placeholder}
          suffix={<ClearAction form={form} onClick={onClear} />}
          onPressEnter={onSubmit}
        />
      </Form.Item>
    </Form>
  );
}

export default forwardRef(SearchBar);
