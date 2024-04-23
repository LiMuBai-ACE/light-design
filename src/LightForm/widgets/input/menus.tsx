import React, { useMemo } from 'react';
import { Input, Select, Dropdown, Space, Spin, Form } from 'antd';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';


import './index.less';

import { DefaultOptionType } from 'antd/es/select';


export type OptionType = DefaultOptionType

export interface OptionMatches {
  name: string;
  label: string;
  placeholder: string;
}

interface OptionsInputProps {
  label?: string;
  theme?: 'select' | 'menus';
  loading?: boolean;
  matches: Record<string, OptionMatches>;
  nomatch: Omit<OptionMatches, 'name'> & { name?: string };
  options: OptionType[];
  value?: any;
  onChange?: (value: any) => void;
}



export const MenusInput = (props: OptionsInputProps) => {
  const { loading, matches, nomatch, options, value, onChange } = props;

  const type = String(value?.type || '');
  const { name, placeholder } = { ...matches?.[type] };

  const items = useMemo(() => {
    return (options || []).map((ele) => {
      return {
        key: String(ele.value),
        label: ele.label,
      };
    });
  }, [options]);

  const text = (items.find((ele) => ele?.key === type) as any)?.label;

  const label = (
    <Spin spinning={loading} size="small">
      <Dropdown
        key={type}
        menu={{
          items,
          selectable: true,
          selectedKeys: !type ? [] : [type],
          onSelect: (res: any) => {
            const val = res.key;
            if (matches?.[val]?.name === name) {
              onChange?.({ type: val });
            } else {
              onChange?.({ ...value, type: val });
            }
          },
        }}
      >
        <div className="action">
          <a>
            <Space size={6}>
              {text || nomatch?.label}
              <DownOutlined />
            </Space>
          </a>
          {!!type && (
            <a
              className="clear"
              onClick={(ev) => {
                ev?.preventDefault();
                ev?.stopPropagation();
                onChange?.(undefined);
              }}
            >
              <CloseOutlined />
            </a>
          )}
        </div>
      </Dropdown>
    </Spin>
  );

  return (
    <Form.Item label={label}>
      <Input
        allowClear
        disabled={!type}
        placeholder={placeholder || nomatch?.placeholder}
        value={value?.[name] ? String(value?.[name]) : ''}
        onChange={(res) => {
          onChange?.({ ...value, [name]: res?.target?.value });
        }}
      />
    </Form.Item>
  );
};

export const SelectInput = (props: OptionsInputProps & { label?: string }) => {
  const { loading, matches, nomatch, options, value, onChange } = props;

  const type = value?.type;

  const { label, name, placeholder } = { ...matches?.[type] };

  return (
    <Form.Item label={label || props?.label}>
      <Space.Compact block>
        <Select
          allowClear
          loading={loading}
          options={options}
          // placeholder="请选择渠道"
          placeholder={nomatch?.label}
          style={{ width: 'auto', maxWidth: 112, marginRight: -1 }}
          dropdownStyle={{ width: 'auto' }}
          value={type}
          onChange={(val) => {
            if (!name || matches?.[val]?.name !== name) {
              onChange?.({ type: val });
            } else {
              onChange?.({ ...value, type: val });
            }
          }}
        />
        <Input
          allowClear
          placeholder={placeholder || nomatch?.placeholder}
          style={{ flex: 1 }}
          value={value?.[name] ? String(value?.[name]) : ''}
          onChange={(res) => {
            onChange?.({ ...value, [name]: res?.target?.value });
          }}
        />
      </Space.Compact>
    </Form.Item>
  );
};

export const OptionsInput = (props: OptionsInputProps) => {
  const { label, theme, ...others } = props;

  if (theme === 'select') {
    return <SelectInput {...others} label={label} />;
  }

  return <MenusInput {...others} />;
};
