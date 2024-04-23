import { useMemo, useState } from 'react';

import { type TabsProps } from 'antd';

interface CubeTabsProps extends Omit<TabsProps, 'activeKey' | 'defaultActiveKey'> {
  initial?: string;
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
}

export const useCubeTabs = (props: CubeTabsProps) => {
  const { initial, options, onChange } = props;
  const defkey = initial || options?.[0]?.value;

  const [tab, setTab] = useState<string>(defkey);

  const items = useMemo(
    () =>
      (options || []).map((ele) => {
        return {
          key: ele?.value,
          label: ele.label,
        };
      }),
    [options],
  );

  return {
    activeKey: tab,
    items,
    onChange: (current: string) => {
      setTab(current);
      onChange?.(current);
    },
  };
};
