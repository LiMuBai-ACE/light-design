import SvgIcon from '@/components/SvgIcon';
import React, { FC, Fragment } from 'react';

import { isObject } from '@/utils';
import { Widget, widgetComponents, WidgetTypeEnum } from '../../../config';
import DragElement from './dragElement';
import './index.less';

const WidgetComponents: FC = () => {
  const getKey = (widget: WidgetTypeEnum | Widget): string => {
    if (isObject(widget)) return (widget as Widget).widget;
    return widget as WidgetTypeEnum;
  };

  return (
    <>
      {widgetComponents.map((item) => (
        <Fragment key={item.title}>
          <div className="widget-title">{item.title}</div>
          <div className="widget-group">
            {item.components.map((component) => (
              <DragElement key={getKey(component.widget)} config={component}>
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
