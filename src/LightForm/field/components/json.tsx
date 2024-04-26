import { cloneElement, isValidElement } from 'react';

import { AnyJson } from '@/utils';

/** @name JsonField JSON格式的数据 */
export default function JsonField(props: any) {
  const { id, widget, disabled, ...others } = props;

  const namepath = (id || '').split('_');

  const parent = { name: namepath };

  if (isValidElement(widget)) {
    const model = widget?.props as AnyJson;
    const forbidden = !!(model?.disalbed || disabled);
    const attrs = { id, parent, disabled: forbidden, ...others };
    return cloneElement(widget, attrs);
  }

  return null;
}
