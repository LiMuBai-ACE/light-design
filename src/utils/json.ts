import { set } from 'lodash-es';
import QueryString from 'querystring';

import { isArray, isEmpty, isObject } from './common';

const bools = ['false', 'true'];
const EmptyValues = ['{}', '[]', 'null', 'undefined', 'false'];

const JsonExtend = {
  regex: {
    json: /^\{[\w\W]*\}$/,
    zip: /\.?([^.[\]]+)|\[(\d+)\]/g,
    num: /(^-?[1-9]\d*\.\d+$|^-?0\.\d+$|^-?[1-9]\d*$|^0$)/,
    trim: /(^\/_\/_proto\/_\/_$)|(^prototype$)|(^constructor$)/,
  },

  /**
   * @name zip JSON结构缩合
   * @param data 粗糙的JSON
   * @example { a.b:1, c:2 } ——> { a: { b: 1 }, c: 2 }
   */
  zip: (data: Record<string, any>) => {
    if (Object(data) !== data || Array.isArray(data)) return data;

    const output: Record<string, any> = {};

    Object.keys(data).forEach((key) => {
      let val = data[key];

      if (EmptyValues.includes(val)) {
        return;
      }

      if (JsonExtend.regex.num.test(val)) {
        val = val.length < 16 ? Number(val) : val;
        set(output, key, val);
        return;
      }

      if (val === bools[1]) {
        set(output, key, true);
        return;
      }

      if (val === bools[0]) {
        set(output, key, false);
        return;
      }

      if (JsonExtend.validateKey(key)) {
        set(output, key, data[key]);
        return;
      }
    });

    return output;
  },

  // 递归扁平化处理JSON
  recurse: (options: {
    result: Record<string, any>;
    source: Record<string, any>;
    key: string | number;
  }) => {
    const { result, source, key } = options;
    const { toString } = Object.prototype;

    if (toString.call(source) === '[object Object]') {
      let empty = true;
      const keylist = Object.keys(source);

      keylist.forEach((name) => {
        if (JsonExtend.validateKey(name)) {
          empty = false;
          JsonExtend.recurse({
            result,
            source: source[name],
            key: key ? `${key}.${name}` : name,
          });
        }
      });

      if (empty && key) {
        result[key] = '{}';
      }
    } else if (toString.call(source) === '[object Array]') {
      const len = source.length;
      if (len > 0) {
        source.forEach((item: any, index: number) => {
          JsonExtend.recurse({
            result,
            source: item,
            key: key ? `${key}.[${index}]` : index,
          });
        });
      } else {
        result[key] = [];
      }
    } else {
      result[key] = source;
    }
  },

  /**
   * @name zip JSON扁平化处理
   * @param model 原始JSON
   * @example { a: { b: 1, c: 2 } ——> { a.b: 1, a.c: 2 }  }
   */
  flatten: (model: Record<string, any>): Record<string, any> => {
    const result = {};

    JsonExtend.recurse({ result, source: model, key: '' });

    return result;
  },

  // 解析字符串JSON
  json: (str: string): Record<string, any> => {
    try {
      return JSON.parse(str, function (key, value) {
        if (JsonExtend.validateKey(key)) {
          return value;
        }
      });
    } catch (err) {
      return {};
    }
  },

  /**
   * 字符串 转 JSON
   * 'x=1&y.a=3&y.b=4&z=5' —————> { x: 1, y: { a: 3, b: 4 }, z: 5 }
   * '{ "x": 1, "y.a": 3, "y.b": 4, z: 5 }' —————> { x: 1, y: { a: 3, b: 4 }, z: 5 }
   * */
  str2json: (str: string, deep?: boolean) => {
    if (JsonExtend.regex.json.test(str)) {
      const json = JsonExtend.json(str);
      return deep ? JsonExtend.zip(json) : json;
    }

    return JsonExtend.zip(QueryString.parse(str));
  },

  json2arr: (json: Record<string, any>) => {
    return Object.keys(json).map((key: string) => ({
      value: key,
      label: json[key],
    }));
  },

  /**
   * @method validateKey 防止原型链污染, 屏蔽部分属性
   * @return {boolean} true=校验通过
   * @return {boolean} false=校验不通过
   * */
  validateKey: (key: string): boolean => {
    return !JsonExtend.regex.trim.test(key);
  },

  /**
   * @method str2query 字符串键值对 转换成 JSON格式
   * @example 'x=1&y.a=3&y.b=4&z=5' —————> { x: 1, 'y.a': 3, 'y.b': 4, z: 5 }
   * */
  str2query: (string: string) => {
    const data = string.replace(/^\?/, '').split('&');

    const query = {};

    data.forEach((ele) => {
      const [key, value] = (ele || '')?.split('=');
      if (!!key && JsonExtend.validateKey(key)) {
        Object.assign(query, { [key]: value });
      }
    });

    return query;
  },

  /**
   * JSON数据解析缩合
   * 'x=1&y.a=3&y.b=4&z=5' —————> { x: 1, y: { a: 3, b: 4 }, z: 5 }
   * '{ "x": 1, "y.a": 3, "y.b": 4, z: 5 }' —————> { x: 1, y: { a: 3, b: 4 }, z: 5 }
   * { "x": 1, "y.a": 3, "y.b": 4, z: 5 } —————> { x: 1, y: { a: 3, b: 4 }, z: 5 }
   * */
  parse: (arg: string | Record<string, any>) => {
    if (isEmpty(arg)) {
      return {};
    }

    if (typeof arg === 'string') {
      return JsonExtend.str2json(arg);
    }

    return JsonExtend.zip(arg);
  },

  /**
   * JSON数据序列化
   * { x: 1, y: { a: 3, b: 4 }, z: 5 } ——————> 'x=1&y.a=3&y.b=4&z=5'
   * */
  stringify: (model: Record<string, any>) => {
    const payload = JsonExtend.flatten(model);
    return QueryString.stringify(payload);
  },

  /** 序列化JSON参数: { a: 1, b: 2 } ————> 'a=1&b=2' */
  serialize: (model: Record<string, any>) =>
    isEmpty(model) ? '' : QueryString.stringify(model),

  trim: (obj: any, type?: string) => {
    const output = isArray(obj) ? [] : {};

    if (isEmpty(obj)) return output;

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (value === undefined) {
        return;
      }

      if ([0, false].includes(value)) {
        Object.assign(output, { [key]: value });
        return;
      }

      const isDeepClear = type === 'deep';

      // 搜索表单: -1 | '' 代表全部, 不使用该参数
      if (isDeepClear && [-1, ''].includes(value)) {
        return;
      }

      // 字符串, 直接trim
      if (typeof value === 'string') {
        // 字符串, 直接trim
        Object.assign(output, { [key]: value.trim() });
        return;
      }

      // 数组或对象, 递归trim
      if (isObject(value) || isArray(value)) {
        // 深度清除模式下, 移除 空数组 和 空对象
        if (isDeepClear) {
          if (!isEmpty(value)) {
            Object.assign(output, { [key]: JsonExtend.trim(value, type) });
          }
          return;
        }

        Object.assign(output, { [key]: JsonExtend.trim(value, type) });
        return;
      }

      // 其他类型, 原值存入
      Object.assign(output, { [key]: value });
    });

    return output;
  },
};

export default JsonExtend;
