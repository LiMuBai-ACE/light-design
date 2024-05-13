import SvgIcon from '@/components/SvgIcon';

import { Layout, Space } from 'antd';
import React, { FC, MouseEvent, useMemo } from 'react';
import { DesignFormProps } from '../..';
import './index.less';

const Header: FC<DesignFormProps> = (props) => {
  const { uploadJson, clearable, preview, generateJson, generateCode } = props;

  const handleClear = (event: MouseEvent) => {
    event.preventDefault();
  };

  return (
    <>
      {useMemo(
        () => (
          <Layout.Header className="header-bar">
            <Space>
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
            </Space>
          </Layout.Header>
        ),
        [uploadJson, clearable, preview, generateJson, generateCode],
      )}
    </>
  );
};

export default Header;
