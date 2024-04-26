import { Button, Form, Row } from 'antd';
import React from 'react';

import { AnyJson, JsonExtend, isEmpty, isFunction } from '@/utils';

import { ExportBtn } from '../widgets/button';

import LightField from '../field';

import './index.less';

const SeachLayout = {
  label: { prefixCls: 'label' },
};

interface MyProps {
  fields: any[];
  initials: AnyJson;
  onSearch: (formdata: AnyJson) => void;
  onExport?: (formdata: AnyJson) => void;
}

export default (props: MyProps) => {
  const {
    fields = [], // form表单项
    initials, // 表单初始化值
    onSearch, // 查询事件
    onExport, // 导出数据
  } = props;

  if (isEmpty(fields)) {
    return null;
  }

  const [form] = Form.useForm(); // form实例

  // 表单取值
  const onFormValues = async () => {
    const formdata = await form.validateFields();
    return JsonExtend.trim(formdata, 'deep');
  };

  // 点击搜索
  const onFormSearch = async () => {
    const params = await onFormValues();
    if (isFunction(onSearch)) {
      onSearch(params);
    }
  };

  // 点击导出
  const onFormExport = async () => {
    const params = await onFormValues();
    if (onExport) {
      onExport(params);
    }
  };

  return (
    <Form form={form} initialValues={initials} labelCol={SeachLayout.label}>
      <Row justify="end" align="top" style={{ columnGap: 15 }}>
        {LightField.each({ fields })}
        <Button type="primary" htmlType="submit" onClick={onFormSearch}>
          查询
        </Button>
        {onExport && <ExportBtn onExport={onFormExport} />}
      </Row>
    </Form>
  );
};
