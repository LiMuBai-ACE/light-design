import React, { useMemo } from 'react';
import { Select } from 'antd';
import type { SelectProps as AntSelectProps } from 'antd';
import { DefOptions } from '../../constants';

export interface CommonSelectProps extends Omit<AntSelectProps, 'options' | 'onChange'> {
  hasAll?: boolean;
  options?: any[];
  mappings?: { [key: string]: string };
  onChange: (res: number | string, options: any) => void;
  style: { [key: string]: any };
  width: number | string;
}

interface DefOption {
  label: string | number;
  value: string | number;
}

/**
 * @name MappingSelect 下拉列表-选项使用Mapping参数
 * */
export const MappingSelect = (props: Omit<CommonSelectProps, 'options' | 'fieldNames' | 'width'>) => {
  const {
    hasAll,
    mappings = {}, // 选项集合-Maps模式。 如: {[valu1]: label1, [valu2]: label2, ...}
    ...others
  } = props;

  // 置顶选项-全部
  const options = useMemo(() => {
    const list: DefOption[] = Object.keys(mappings || {}).map((code) => ({
      value: code,
      label: mappings[code],
    }));

    if (hasAll) {
      list.push(DefOptions.all as DefOption);
    }

    return list;
  }, [hasAll, mappings]);

  return <Select {...others} options={options} />;
};

export const KeymapSelect = (props: Omit<CommonSelectProps, 'mappings' | 'width'>) => {
  const {
    hasAll,
    options = [], // 选项集合-List模式。 如: [{...option1}, {...option2}, ...]
    ...others
  } = props;

  // 置顶选项-全部
  const list = useMemo(() => {
    return hasAll ? [DefOptions.all, ...options] : options;
  }, [hasAll, options]);

  return <Select {...others} options={list} />;
};
