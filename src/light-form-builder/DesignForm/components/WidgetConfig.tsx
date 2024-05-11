import { Form } from 'antd';
import React, { FC, useMemo } from 'react';

const WidgetConfig: FC = () => {
  return (
    <>
      {useMemo(
        () => (
          <Form layout="vertical"></Form>
        ),
        [],
      )}
    </>
  );
};

export default WidgetConfig;
