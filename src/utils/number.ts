import { evaluate, format } from 'mathjs';

export const MemorySize = {
  kb: 1024,
  mb: Math.pow(1024, 2),
  gb: Math.pow(1024, 3),
};

const NumExtend = {
  random: (len?: number) => {
    const val = Math.random();
    return 0 - Number(val.toString().split('.')[1]);
  },
  calc: (formula: string, precision?: number) => {
    const value = evaluate(formula);

    if (precision !== undefined) {
      return format(value, { notation: 'fixed', precision });
    }

    return value;
  },

  // 0~9数字前置补0
  prefix: (num: number, len = 2) => (Array(len).join('0') + num).slice(-len),

  reg: {
    unmatch: /[^0-9.]/g, // 非数字
    // eslint-disable-next-line no-useless-escape
    point: /^(-)*(\d+)\.(\d\d).*$/, // 格式化 ————> 最多保留两位小数点
    currency: /\d{1,3}(?=(\d{3})+$)/g, // 格式化 ————> 货币整数部分加入千分位处理
    mobile: /^[1][3-9]\d{9}$|^([695])\d{7}$|^[0][9]\d{8}$|^[6]([86])\d{5}$|^\+?85[23][96]\d{7}$|^\+?85[23]6[68]\d{5}/,
  },

  replacement: {
    def: '$1$2.$3',
    currency: '$2.$3',
    counter: '$2',
  } as { [key: string]: string },

  // 格式转换, 最多保留两位小数点
  parse: (value?: number | string, type?: string): string => {
    if (!value && value !== 0) {
      return '';
    }

    if (typeof value === 'number') {
      const replacement = NumExtend.replacement[type || 'def'];
      const result = String(value).replace(NumExtend.reg.point, replacement);
      return type === 'counter' ? result.split('.')[0] : result;
    }

    // String类型的数据, 先清洗去除非数字
    if (typeof value === 'string') {
      const str = value.replace(NumExtend.reg.unmatch, '');
      return NumExtend.parse(Number(str), type);
    }

    return '';
  },

  /**
   * @name thousands 数字的千分位格式化处理
   * @example 3677 ————> 3,677
   * */
  thousands: (value?: string | number) => {
    const temp = typeof value === 'string' ? value : String(value);
    if (!temp) {
      return '';
    }
    return temp.replace(NumExtend.reg.currency, '$&,');
  },

  /**
   * @name currency 货币格式, 显示千分位
   * @example 3600 ————> 3,600
   * @example 3600.33 ————> 3,600.33
   * */
  currency: (value?: number | string) => {
    const currency = NumExtend.parse(value, 'currency');

    if (!currency) {
      return '';
    }

    const [prefix, suffix] = currency.split('.');

    if (!prefix) {
      return '';
    }

    const int = NumExtend.thousands(prefix);
    return suffix ? [int, suffix].join('.') : int;
  },

  /**
   * @name discount 折扣格式: 最大到9.99折
   * */
  discount: (value?: number | string) => {
    const num = Number(value || 0) >= 10 ? 9.99 : value;
    return NumExtend.parse(String(num));
  },

  /**
   * @name counter 计数, 只能输入正整数
   * */
  counter: (value?: number | string) => {
    const text = NumExtend.parse(value, 'counter');
    return NumExtend.thousands(text);
  },

  fraction: (val: string | number, precision = 2) => {
    if (!val && Number(val) !== 0) {
      return undefined;
    }

    const [int, float] = String(val).split('.');

    const fraction = (float || '').substr(0, precision);
    const suffix = new Array(precision - fraction.length).fill(0).join('');

    return [int, fraction + suffix].join('.');
  },

  memory: (size: number) => {
    if (!size) {
      return 0;
    }

    if (size <= MemorySize.mb) {
      return `${(size / MemorySize.kb).toFixed(2)}KB`;
    }

    if (size <= MemorySize.gb) {
      return `${(size / MemorySize.mb).toFixed(2)}MB`;
    }

    return `${(size / MemorySize.gb).toFixed(2)}GB`;
  },
};

export default NumExtend;
