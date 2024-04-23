import classNames from 'classnames';
import { isFunction, isArray, isNumber, isString } from 'lodash';

export { isFunction, isArray, isNumber, isString };

export const sleep = (ms = 50, arg?: any): Promise<any> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const res = isFunction(arg) ? arg() : arg;
      resolve(res);
    }, ms);
  });

export const isEmpty = (obj: any) =>
  [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length;

// 判断是否为对象
export const isObject = (obj: any): boolean => {
  const res = Object.prototype.toString.call(obj);
  return res.indexOf('Object') > -1;
};

export const ClassName = {
  poly: (list: (string | undefined)[]) => {
    if (!isEmpty(list)) {
      return classNames(list.filter((ele) => !!ele));
    }
    return '';
  },
  setup: (opt: { [key: string]: boolean }) => {
    const list = Object.keys(opt).filter((key) => opt[key]);
    return ClassName.poly(list);
  },
};
