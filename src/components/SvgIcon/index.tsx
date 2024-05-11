import React, { CSSProperties, FC, MouseEvent } from 'react';

interface Props {
  name: string;
  color?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<SVGSVGElement>) => void;
}

// 动态引入Icon组件的函数
const loadIcon = (iconName: string) => {
  return () => import(`@/assets/icons/${iconName}.svg`);
};

const SvgIcon: FC<Props> = (props) => {
  const { name, color, className, style, onClick } = props;

  const Icon = loadIcon(name);

  return (
    <span className="svg-container">
      <img src={`./icons/${name}.svg`} alt="" />
      {/* <Icon
        className={ClassName.poly(['svg-icon', className])}
        style={{ color, ...style }}
        onClick={onClick}
      /> */}
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
