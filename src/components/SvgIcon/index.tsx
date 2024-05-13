import '@/assets/css/iconfont.css';
import { ClassName } from '@/utils';
import React, { CSSProperties, FC, MouseEvent } from 'react';
import './index.less';

interface Props {
  name: string;
  color?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const SvgIcon: FC<Props> = (props) => {
  const { name, color, className, style, onClick } = props;

  return (
    <span className="svg-container">
      <i
        className={ClassName.poly(['icon-font', `icon-${name}`, className])}
        style={{ color, ...style }}
        onClick={onClick}
      />
    </span>
  );
};

SvgIcon.defaultProps = {
  color: '',
  className: '',
  style: {},
  onClick: () => {},
};

export default SvgIcon;
