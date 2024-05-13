import { FormInstance } from 'antd';
import React, { FC } from 'react';
import './index.less';

interface Props {
  formInstance: FormInstance;
}

const WidgetForm: FC<Props> = (props) => {
  const { formInstance } = props;

  return (
    <div className="widget-form-container">
      <div className="widget-form-empty">从左侧拖拽来添加字段</div>
    </div>
  );
};

export default WidgetForm;
