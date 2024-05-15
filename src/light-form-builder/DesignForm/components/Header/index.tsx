import SvgIcon from '@/components/SvgIcon';

import { Layout, Row } from 'antd';
import React, { FC, MouseEvent } from 'react';
import { DesignFormProps } from '../..';
import './index.less';

const Header: FC<DesignFormProps> = (props) => {
  const {
    uploadJson = true,
    clearable = true,
    preview = true,
    generateJson = true,
    generateCode = true,
  } = props;

  const handleClear = (event: MouseEvent) => {
    event.preventDefault();
  };

  return (
    <Layout.Header className="header-bar">
      <Row className="operation-list">
        {uploadJson && (
          <div className="operation-item">
            <SvgIcon name="Upload" />
            导入Json
          </div>
        )}
        {clearable && (
          <div className="operation-item" onClick={handleClear}>
            <SvgIcon name="Delete" />
            清空
          </div>
        )}
        {preview && (
          <div className="operation-item">
            <SvgIcon name="Preview" />
            预览
          </div>
        )}
        {generateJson && (
          <div className="operation-item">
            <SvgIcon name="GenerateJson" />
            生成JSON
          </div>
        )}
        {generateCode && (
          <div className="operation-item">
            <SvgIcon name="GenerateCode" />
            生成代码
          </div>
        )}
      </Row>
    </Layout.Header>
  );
};

export default Header;
