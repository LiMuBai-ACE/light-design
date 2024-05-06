import type { CardProps } from 'antd';
import { Card as AntCard, ConfigProvider } from 'antd';
import React, {
  ReactNode,
  cloneElement,
  isValidElement,
  useMemo,
  useState,
} from 'react';

import { ClassName, isFunction } from '@/utils';

interface CubeCardProps extends Omit<CardProps, 'size'> {
  size?: CardProps['size'] | 'middle';
}

export default function Card(props: CubeCardProps) {
  const { className, size, ...others } = props;

  const css = ClassName.setup({
    ['cube-card-middle']: size === 'middle',
    [className as string]: !!className,
  });

  return (
    <ConfigProvider
      theme={{
        token: {
          /* 尺寸: small  */
          // fontSize: 12,
          padding: 12,
          // /* 尺寸: default  */
          paddingLG: 20,
          // fontSizeLG: 14,
          // lineHeightLG: 1.2,
        },
      }}
    >
      <AntCard
        className={css}
        {...others}
        size={size === 'small' ? 'small' : undefined}
      />
    </ConfigProvider>
  );
}

export interface TabsCardProps {
  initial?: string;
  bordered?: boolean;
  options: { label: ReactNode; value: string }[];
  children?: any;
  onChange?: (value: string) => void;
}

export const useTabsCard = (props: Omit<TabsCardProps, 'children'>) => {
  const { initial, options, onChange } = props;
  const defkey = initial || options?.[0]?.value;

  const [tab, setTab] = useState<string>(defkey);

  const tabList = useMemo(
    () =>
      (options || []).map((ele) => {
        return {
          label: ele.label,
          key: ele?.value,
        };
      }),
    [options],
  );

  return {
    activeTabKey: tab,
    tabList,
    onTabChange: (current: string) => {
      setTab(current);
      if (isFunction(onChange)) {
        onChange?.(current);
      }
    },
  };
};

export const TabsCard = (props: TabsCardProps) => {
  const { children, initial, options, onChange, ...others } = props;

  const attrs = useTabsCard({ initial, options, onChange });

  const actived = attrs.activeTabKey;

  return (
    <Card {...attrs} {...others}>
      {isValidElement(children)
        ? cloneElement(children as any, { actived })
        : children}
    </Card>
  );
};
