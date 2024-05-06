import { StrExtend } from '@/utils';
import { useState } from 'react';

interface ExpandControl {
  key: string;
  collapsed: boolean;
}

export const useExpand = ({ initail }: { initail: boolean }) => {
  /* State-开关(展开/收起) */
  const [expand, setExpand] = useState<ExpandControl>({
    collapsed: initail,
    key: StrExtend.random(),
  });

  /* Method-开关(展开/收起) */
  const toggle = () => {
    const bool = expand.collapsed;
    if (bool) {
      setExpand({ ...expand, collapsed: !bool });
    } else {
      setExpand({ collapsed: !bool, key: StrExtend.random() });
    }
  };

  return {
    ...expand,
    action: { toggle },
  };
};
