import { Layout, Row, type RowProps } from 'antd';
import React from 'react';

import './layoutFooter.less';

interface LayoutFooterProps extends RowProps {}

export default (props: LayoutFooterProps) => {
  const { justify = 'center', children, ...others } = props;

  return (
    <Layout.Footer className="light-form-footer">
      <Row
        align="middle"
        justify={justify}
        className="footer-affix"
        {...others}
      >
        {children}
      </Row>
    </Layout.Footer>
  );
};
