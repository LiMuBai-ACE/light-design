import { App, ConfigProvider } from 'antd';
import { createRoot } from 'react-dom/client';

import { EnvLocal } from '@/config/constants';
import React from 'react';
import StrExtend from '../string';
import { DynamicItemProps } from '../types';

export interface DynamicRecords {
  [key: string]: DynamicItemProps;
}

const records: DynamicRecords = {};

const destroyItem = (id: string) => {
  const model = records[id];
  if (model?.destroy) {
    model.destroy();
  }
};

const destroyAll = (id?: string | string[]) => {
  if (id === 'string') {
    destroyItem(id);
    return;
  }

  if (Array.isArray(id)) {
    (id || []).forEach((ele) => {
      destroyItem(ele);
    });
    return;
  }

  const list = Object.keys(records);

  (list || []).forEach((ele) => {
    destroyItem(ele);
  });
};

const setup = (marker?: string) => {
  let visible = false;

  const mydiv = document.createElement('div');

  if (marker) {
    mydiv.className = `vict-dynamic-${marker}`;
  }

  let myroot = createRoot(mydiv);

  let id = StrExtend.random();

  // 选择器-关闭
  const destroy = () => {
    if (visible) {
      myroot.unmount();
      document.body.removeChild(mydiv);

      visible = false;
      delete records[id];
    }
  };

  return {
    visible,
    destroy,
    mount: (component: any): DynamicItemProps => {
      visible = true;

      myroot.render(
        <ConfigProvider locale={EnvLocal.zhCN}>
          <App>{component}</App>
        </ConfigProvider>,
      );
      document.body.appendChild(mydiv);

      const output: DynamicItemProps = { id, destroy };

      Object.assign(records, { [id]: output });

      return output;
    },
  };
};

const DynamicRender = { records, setup, destroy: destroyAll, destroyItem };

export default DynamicRender;
