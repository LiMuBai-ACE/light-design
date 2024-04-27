import { Input, InputProps, InputRef, Space } from 'antd';

import { sleep } from '@/utils';
import React, {
  ChangeEventHandler,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { WxEmotions } from './widgets';

export * from './widgets';

export interface LDInputEmotionProps extends Omit<InputProps, 'onChange'> {
  emotions?: any[];
  onChange?: (value: string) => void;
}
const InputEmotions: FC<LDInputEmotionProps> = (props) => {
  const { emotions, width: inputWidth, ...others } = props;

  const inputRef = useRef<InputRef>(null);

  const [spaceW, setSpaceW] = useState(450);

  const { value, onChange } = others;

  const [inputV, setInputV] = useState(value);

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      setSpaceW(width || 450);
    }
  });

  useEffect(() => {
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e: any) => {
    const newValue = e.target.value;
    setInputV(newValue);
    onChange?.(newValue);
  };

  return (
    <Space
      style={{ width: '100%' }}
      ref={(node) => {
        if (node) {
          resizeObserver.observe(node);
        }
      }}
    >
      <Input
        allowClear
        ref={inputRef}
        style={{ width: inputWidth || spaceW - 40 }}
        value={inputV}
        onChange={handleInputChange}
      />
      <WxEmotions
        onCheck={async (res) => {
          const emoji = res.label;
          if (inputRef?.current?.input) {
            const inputValue = inputRef?.current?.input?.value || '';
            const newValue = String(inputValue + emoji);
            setInputV(newValue);
            onChange?.(newValue);
          }
          await sleep(10);
          inputRef?.current?.focus?.();
        }}
      />
    </Space>
  );
};

export default InputEmotions;
