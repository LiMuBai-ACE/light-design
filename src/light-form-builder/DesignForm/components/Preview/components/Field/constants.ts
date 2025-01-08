import { NamePath } from 'antd/es/form/interface';
import { get } from 'lodash-es';

import { isEmpty } from '@/utils';

import { CompareProps, ConditionCheckProps, ConditionFieldProps, ConditionModel, WartchConfig } from './type';

export const ConditionExtend = {
  // 条件判断
  check: ({ namelist, conditions, form }: ConditionCheckProps) => {
    // 遍历依赖字段, 逐项查询数据进行对比
    const results = namelist.map((name, index) => {
      let data: any = form.getFieldValue(name as NamePath);
      const { value, prop, compare } = conditions[index];

      if (prop) {
        data = data?.[prop];
      }

      if (value === undefined) {
        return !!data;
      }

      switch (compare) {
        case '>':
          return data > value;
        case 'more':
          return data > value;
        case '<':
          return data < value;
        case 'less':
          return data < value;
        case '>=':
          return data >= value;
        case '<=':
          return data <= value;
        case '||':
          return (value || []).includes(data);
        case 'includes':
          return (value || []).includes(data);
        case 'not':
          return data !== value;
        case '!==':
          return data !== value;

        default:
          return data === value;
      }
    });

    return !results.some((ele: boolean) => !ele);
  },

  // 合并字段项, 输出 NamePath[]
  fields: (options: ConditionFieldProps): NamePath[] => {
    const { conditions, dependencies, watch } = options;

    // watch 方案
    if (!isEmpty(watch)) {
      const list: NamePath[] = [];

      (watch as WartchConfig[]).forEach((ele) => {
        // 单字段
        if (!isEmpty(ele.name)) {
          list.push(ele.name as NamePath);
          return;
        }

        // 多字段
        if (!isEmpty(ele.namelist)) {
          list.push(...(ele.namelist as NamePath[]));
        }
      });
      return list;
    }

    // conditions 方案
    if (!isEmpty(conditions)) {
      return (conditions as ConditionModel[]).map((ele) => ele.name);
    }

    // dependencies 方案
    return (!isEmpty(dependencies) && dependencies) || [];
  },

  // 监听指定的字段值, 当发生变化时通知下级节点更新
  compare: (options: CompareProps) => {
    const { prev, current, namelist } = options;

    const list = (namelist || []).map((ele) => {
      const key = Array.isArray(ele) ? ele.join('.') : ele;
      return get(prev, key) === get(current, key);
    });

    return list.includes(false);
  },
};
