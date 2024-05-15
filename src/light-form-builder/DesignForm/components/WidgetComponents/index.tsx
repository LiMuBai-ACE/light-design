import SvgIcon from '@/components/SvgIcon';
import React, { FC, Fragment } from 'react';

import { widgetComponents } from '../../../config';
import DragElement from './dragElement';
import './index.less';

const WidgetComponents: FC = () => {
  return (
    <>
      {widgetComponents.map((item) => (
        <Fragment key={item.title}>
          <div className="widget-title">{item.title}</div>
          <div className="widget-group">
            {item.components.map((component) => (
              <DragElement key={component.type} config={component}>
                <div className="widget-group-item">
                  <SvgIcon name={component.icon} />
                  <span>{component.label}</span>
                </div>
                {/* {snapshot.isDragging && (
                  <div className="widget-group-item">
                    <SvgIcon name={component.icon} />
                    <span>{component.label}</span>
                  </div>
                )} */}
              </DragElement>
            ))}
          </div>
        </Fragment>
      ))}
    </>
  );
};

export default WidgetComponents;
