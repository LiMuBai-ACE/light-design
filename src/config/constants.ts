import { ColorPickerProps } from 'antd';
import zhCN from 'antd/locale/zh_CN';

export const EnvLocal = {
  zhCN,
};

export const DefSettings = {
  'color-picker': {
    presets: [
      {
        label: '推荐以下配色',
        colors: [
          '#F5222D',
          '#FA8C16',
          '#FADB14',
          '#8BBB11',
          '#52C41A',
          '#13A8A8',
          '#1677FF',
          '#2F54EB',
          '#722ED1',
          '#EB2F96',
        ],
      },
    ],
  } as ColorPickerProps,
};
