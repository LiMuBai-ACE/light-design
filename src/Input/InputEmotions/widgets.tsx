import { MehOutlined } from '@ant-design/icons';
import { Button, Popover, Row } from 'antd';
import React, { CSSProperties, useMemo } from 'react';

import './widgets.less';

const source = {
  def: [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '🤣',
    '😂',
    '🙂',
    '🙃',
    '🫠',
    '😉',
    '😊',
    '😇',
    '🥰',
    '😍',
    '🤩',
    '😘',
    '😗',
    '😏',
    '😬',
    '😌',
    '😪',
    '🤤',
    '😚',
    '😙',
    '🥲',
    '😋',
    '😛',
    '😜',
    '🤪',
    '😝',
    '🤑',
    '🤗',
    '🤭',
    '😬',
    '😌',
    '🤯',
    '🤠',
    '🥳',
    '🥸',
    '😎',
    '🤓',
    '😱',
    '😈',
    '💘',
    '💝',
    '💖',
    '💗',
    '💓',
    '💞',
    '💕',
    '💟',
    '❣❤',
    '🧡',
    '💛',
    '💚',
    '💙',
    '💋',
    '💯',
    '💥',
    '💫',
  ],
  body: [
    '✌',
    '🫰',
    '🤟',
    '👈',
    '👉',
    '👍',
    '🙌',
    '🙏',
    '💪',
    '💏',
    '💑',
    '👋',
    '✋',
    '✊',
    '👊',
    '👏',
  ],
  place: [
    '☀️',
    '⭐',
    '🌟',
    '🌀',
    '🌈',
    '⛄',
    '🔥',
    '💧',
    '🌊',
    '🧨',
    '✨',
    '🎈',
    '🎉',
    '🎊',
    '🎀',
    '🎁',
    '✴️',
    '🆒',
    '🆓',
    '🆕',
    '❗',
    '💰',
    '❇️',
    '✅',
    '🎃',
    '📸',
    '💡',
    '📢',
    '🔋',
    '📍',
    '🔑',
  ],
};

export const emotions = [...source.def, ...source.body, ...source.place];

interface EmotionActionProps {
  onCheck?: (data: { label?: string; index: number }) => void;
}

const EmojFontList = (props: EmotionActionProps) => {
  const { onCheck } = props;

  const width = useMemo(() => {
    return 32 * 15;
  }, []);

  return (
    <Row style={{ width }}>
      {emotions.map((ele, index) => {
        const style: CSSProperties = {
          width: 32,
          height: 32,
          fontSize: 20,
          textAlign: 'center',
        };

        return (
          <span
            key={index}
            style={style}
            className="item"
            onClick={(ev) => {
              ev?.stopPropagation?.();
              onCheck?.({ label: ele, index });
            }}
          >
            {ele}
          </span>
        );
      })}
    </Row>
  );
};

export const WxEmotions = (props: EmotionActionProps) => {
  return (
    <Popover placement="bottomRight" content={<EmojFontList {...props} />}>
      <Button icon={<MehOutlined />} />
    </Popover>
  );
};
