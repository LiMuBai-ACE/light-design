import { DefaultOptionType } from 'antd/es/select';
import { Key, ReactNode } from 'react';
import { AnyJson } from '.';
export interface OptionType extends DefaultOptionType { }

export interface StorageStore {
  [key: string]: {
    value: any;
    timestamp?: number;
    expiry?: number;
  };
}

export interface StorageInstance {
  store: StorageStore;
  clear: () => void;
  getItem: (key: string) => any;
  setItem: (key: string, value: any, expiry?: number) => void;
  removeItem: (key: string) => void;
  [key: string]: any;
}

export interface DynamicItemProps {
  id: string;
  destroy: () => void;
}

export interface CMSLink {
  path: string;
  query: { [key: string]: any };
  appid?: string;
  type: 'web' | 'customize' | 'weapp' | string; // webView | 自定义 ｜ 外部小程序 ｜ string
  fulllink?: string;
}

export interface OptionProps {
  value: Key;
  label: ReactNode;
  id?: Key;
  code?: Key;
  disalbled?: boolean;
  children?: OptionProps[];
}

export interface TreeOptionProps {
  key: string | number;
  selectable?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  title: ReactNode;
  data?: AnyJson;
  children?: TreeOptionProps[];
}
