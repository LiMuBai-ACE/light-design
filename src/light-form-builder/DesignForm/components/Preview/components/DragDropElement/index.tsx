import { DropDirection, ItemTypes } from '@/light-form-builder/DesignForm/constants';
import { DesignContext } from '@/light-form-builder/DesignForm/store';
import { LightFieldComponent } from '@/light-form-builder/config';
import { ClassName } from '@/utils';
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import React, { FC, MouseEvent, ReactElement, cloneElement, useContext, useMemo, useRef, useState } from 'react';
import { DropTargetMonitor, XYCoord, useDrag, useDrop } from 'react-dnd';
import DragTips from '../DragTips';
import './index.less';

interface DragDropElementProps {
  /** 包裹拖放功能的子元素 */
  children: ReactElement;
  /** 被拖动的小部件组件 */
  item: LightFieldComponent;
  /** 确定小部件是否可以放置的函数 */
  canDrop?: (draggedItem: LightFieldComponent, monitor: DropTargetMonitor) => boolean;
}

/**
 * 一个允许拖放和放置小部件的拖放元素组件。
 * @return {ReactElement} 拖放元素组件。
 */
const DragDropElement: FC<DragDropElementProps> = (props) => {
  const { children, item, canDrop = () => true } = props;

  const { handleMove, handleClick, state, handleRemove, handleCopy } = useContext(DesignContext);
  const { selectWidgetItem } = state;
  const elementRef = useRef<HTMLDivElement>(null);

  const [direction, setDirection] = useState<DropDirection | undefined>();

  const isActive = useMemo(() => {
    return selectWidgetItem?.id === item.id;
  }, [selectWidgetItem]);

  const [{ isDragging }, drag] = useDrag({
    // 设置填充数据
    item,
    type: ItemTypes.WIDGET,
    end: (item, monitor) => {
      // 先移动到目标位置
      handleMove(item, monitor);

      // 非选中状态选中目标元素
      if (!isActive) {
        handleClick(item);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver, isCanDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.WIDGET,
      drop: () => {
        return {
          ...item,
          direction,
        };
      },
      canDrop,
      hover: (draggedItem, monitor) => {
        // 获取鼠标位置
        const hoverBoundingRect = elementRef.current?.getBoundingClientRect() as DOMRect;

        const pointerOffset = monitor.getClientOffset() as XYCoord;
        const { top, height } = hoverBoundingRect;

        const hoverOffsetTop = pointerOffset?.y - top;

        const dividerHeight = height / 2;
        const hoverDirection = hoverOffsetTop > dividerHeight ? DropDirection.BOTTOM : DropDirection.TOP;
        // 避免重复触发state更新
        if (direction === hoverDirection) return;
        setDirection(hoverDirection);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        isCanDrop: !!monitor.canDrop(),
      }),
    }),
    [direction],
  );

  drag(drop(elementRef));

  const child = cloneElement(children, { ...children.props, style: { opacity: isDragging ? 0.5 : 1 } });

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isActive) return;
    handleClick(item);
  };

  const onDelete = () => {
    handleRemove(item);
  };

  const onCopy = () => {
    handleCopy(item);
  };

  return (
    <div ref={elementRef}>
      <DragTips isShow={isOver && isCanDrop && direction === DropDirection.TOP} />
      <div
        className={ClassName.setup({
          'drag-drop-container': true,
          'drag-drop-active': isActive,
        })}
        onClick={onClick}
      >
        {isActive && (
          <Space size={8} className="operation">
            <Tooltip title="复制">
              <CopyOutlined className="copy" onClick={onCopy} />
            </Tooltip>
            <Tooltip title="删除">
              <DeleteOutlined className="delete" onClick={onDelete} />
            </Tooltip>
          </Space>
        )}
        {child}
      </div>
      <DragTips isShow={isOver && isCanDrop && direction === DropDirection.BOTTOM} />
    </div>
  );
};

export default DragDropElement;
