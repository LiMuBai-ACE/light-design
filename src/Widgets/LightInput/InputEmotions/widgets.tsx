import { MehOutlined } from '@ant-design/icons';
import { Button, Popover, Row, Tabs } from 'antd';
import React, { CSSProperties, FC, useMemo, useState } from 'react';

import './widgets.less';

const source = {
  // 表情
  expression: {
    title: '表情',
    emoji: [
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂',
      '🙂',
      '🙃',
      '😉',
      '😊',
      '😇',
      '😍',
      '🤩',
      '😘',
      '😗',
      '☺',
      '😚',
      '😙',
      '😋',
      '😛',
      '😜',
      '🤪',
      '😝',
      '🤑',
      '🤗',
      '🤭',
      '🤫',
      '🤔',
      '🤐',
      '🤨',
      '😐',
      '😑',
      '😶',
      '😏',
      '😒',
      '🙄',
      '😬',
      '🤥',
      '😌',
      '😔',
      '😪',
      '🤤',
      '😴',
      '😷',
      '🤒',
      '🤕',
      '🤢',
      '🤮',
      '🤧',
      '😵',
      '🤯',
      '🤠',
      '😎',
      '🤓',
      '🧐',
      '😕',
      '😟',
      '🙁',
      '☹',
      '😮',
      '😯',
      '😲',
      '😳',
      '😦',
      '😧',
      '😨',
      '😰',
      '😥',
      '😢',
      '😭',
      '😱',
      '😖',
      '😣',
      '😞',
      '😓',
      '😩',
      '😫',
      '😤',
      '😡',
      '😠',
      '🤬',
      '😀',
    ],
  },
  characters: {
    title: '人物',
    emoji: [
      '👶',
      '🧒',
      '👦',
      '👧',
      '🧑',
      '👱',
      '👨',
      '🧔',
      '👩',
      '♀',
      '♂',
      '🧓',
      '👴',
      '👵',
      '🙍',
      '🙎',
      '🙅',
      '🙆',
      '💁',
      '🙋',
      '🙇',
      '🤦',
      '🤷',
      '⚕',
      '🎓',
      '🏫',
      '⚖',
      '🌾',
      '🍳',
      '🔧',
      '🏭',
      '💼',
      '🔬',
      '💻',
      '🎤',
      '🎨',
      '✈',
      '🚀',
      '🚒',
      '👮',
      '🕵',
      '💂',
      '👷',
      '🤴',
      '👸',
      '👳',
      '👲',
      '🧕',
      '🤵',
      '👰',
      '🤰',
      '🤱',
      '🍼',
      '👼',
      '🎅',
      '🤶',
      '🎄',
      '🧙',
      '🧚',
      '🧛',
      '🧜',
      '🧝',
      '🧞',
      '🧟',
      '💆',
      '💇',
      '🚶',
      '🏃',
      '💃',
      '🕺',
      '🕴',
      '👯',
      '🧖',
      '🧘',
      '🤝',
      '👭',
      '👫',
      '👬',
      '💏',
      '❤',
      '💋',
      '💑',
      '👪',
      '🗣',
      '👤',
      '👥',
    ],
  },
  gesture: {
    title: '手势',
    emoji: [
      '👋',
      '🤚',
      '🖐',
      '✋',
      '🖖',
      '👌',
      '✌',
      '🤞',
      '🤟',
      '🤘',
      '🤙',
      '👈',
      '👉',
      '👆',
      '🖕',
      '👇',
      '☝',
      '👍',
      '👎',
      '✊',
      '👊',
      '🤛',
      '🤜',
      '👏',
      '🙌',
      '👐',
      '🤲',
      '🙏',
      '✍',
      '💅',
      '🤳',
      '💪',
    ],
  },
  daily: {
    title: '日常',
    emoji: [
      '👣',
      '👀',
      '👁',
      '👄',
      '👂',
      '👃',
      '👅',
      '🧠',
      '👓',
      '🕶',
      '👔',
      '👕',
      '👖',
      '🧣',
      '🧤',
      '🧥',
      '🧦',
      '👗',
      '👘',
      '👙',
      '👚',
      '👛',
      '👜',
      '👝',
      '🎒',
      '👞',
      '👟',
      '👠',
      '👡',
      '👢',
      '👑',
      '👒',
      '🎩',
      '🧢',
      '⛑',
      '💄',
      '💍',
      '🌂',
      '☂',
      '💈',
      '🛀',
      '🛌',
      '💥',
      '💫',
      '💦',
      '💨',
    ],
  },
};

interface EmotionActionProps {
  onCheck?: (data: { label?: string; index: number }) => void;
  emotions?: string[];
}

const EmojiChild: FC<EmotionActionProps> = (props) => {
  const width = useMemo(() => {
    return 32 * 15;
  }, []);

  const { onCheck, emotions = [] } = props;

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

const EmojiFontList = (props: EmotionActionProps) => {
  const { onCheck } = props;
  const items = Object.values(source).map((ele, index) => {
    return {
      label: ele.title,
      key: String(index),
      children: <EmojiChild onCheck={onCheck} emotions={ele.emoji} />,
    };
  });
  const [activeKey, setActiveKey] = useState(items[0].key);

  return <Tabs size="small" type="card" onChange={setActiveKey} activeKey={activeKey} items={items} />;
};

export const WxEmotions = (props: EmotionActionProps) => {
  return (
    <Popover placement="bottomRight" content={<EmojiFontList {...props} />}>
      <Button icon={<MehOutlined />} />
    </Popover>
  );
};
