import SvgIcon from '@/components/SvgIcon';
import { ComponentGroup } from '@/light-form-builder/config';
import React, { FC } from 'react';
import Sortable from 'sortablejs';
import './index.less';

interface Props {
  componentGroup: ComponentGroup;
}

const ComponentsGroup: FC<Props> = (props) => {
  const {
    componentGroup: { title, components },
  } = props;

  const sortableGroupDecorator = (instance: HTMLUListElement | null) => {
    if (instance) {
      const options: Sortable.Options = {
        sort: false,
        ghostClass: 'ghost',
        group: {
          name: 'people',
          pull: 'clone',
          put: false,
        },
        setData: (dataTransfer, dragEl) => {
          dataTransfer.setData(
            'SortableDataClone',
            JSON.stringify(components[parseInt(dragEl.dataset.index!, 10)]),
          );
        },
      };

      Sortable.create(instance, options);
    }
  };

  return (
    <>
      <div className="widget-title">{title}</div>
      <ul ref={sortableGroupDecorator} className="widget-group">
        {components.map((component, index) => (
          <li key={component.type} className="widget-label" data-index={index}>
            <div className="widget-group-item">
              <SvgIcon name={component.icon} />
              <span>{component.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ComponentsGroup;
