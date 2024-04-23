const encoder = TextEncoder ? new TextEncoder() : null;

// 掩码正则
export const StrReg: Record<string, RegExp> = {
  name: /(^.{1})(.+)/, // 姓名
  id: /(^.{3})(.+)(.{4}$)/, // 身份证号
  mobile: /(^.{3})(.+)(.{4}$)/, // 手机号码
  itcMobile: /(^.{4})(.+)(.{4}$)/, // 手机号码
  address: /(^.{3})(.+)(.{3}$)/, // 地址
  emotion:
    /([\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\\A9|\\AE]\u3030|\uA9|\uAE|\u3030)/g,
};

// 随机类型: upper=[A~Z] | lower=[a~z] | letter=[a~zA~Z] | digit=[0~9] | dirty=[0~9a~LzA~Z]
type RandomType = 'upper' | 'lower' | 'letter' | 'digit' | 'dirty';

// 字母集
const LetterOnly = {
  config: {
    upper: { start: 65, length: 26 }, // [A~Z]的ASCII码: 65 + 0~25;
    lower: { start: 97, length: 26 }, // [a~z]的ASCII码: 97 + 0~25;
    digit: { start: 48, length: 10 }, // [0~9]的ASCII码: 48 + 0~10;
  },

  create: (type: 'upper' | 'lower' | 'digit') => {
    const list: string[] = [];

    const { start, length } = LetterOnly.config[type];

    for (let i = 0; i < length; i++) {
      list.push(String.fromCharCode(start + i));
    }

    return list;
  },

  init: () => {
    const digit = LetterOnly.create('digit'); // 0~9
    const lower = LetterOnly.create('lower'); // 纯英文字母小写
    const upper = LetterOnly.create('upper'); // 纯英文字母大写

    const letter = [...lower, ...upper]; // 纯英文字母大小写混合

    Object.assign(LetterOnly, {
      digit,
      lower,
      upper,
      letter,
      dirty: [...digit, ...letter], // [0~9a~LzA~Z]
    });
  },

  digit: [] as string[],
  lower: [] as string[],
  upper: [] as string[],
  letter: [] as string[],
  dirty: [] as string[],
};

LetterOnly.init();

const StrExtend = {
  trim: (str?: string) => (str || '').trim(),

  /* 链接地址字符串的 http协议 替换成 https 协议 */
  https: (str?: string) => (!str ? str : str.replace(/^http:/, 'https:')),

  /* 在字符串{insert}的第{pos}处插入{insert}字符 */
  insert: (params: { origin?: string; pos?: number; insert?: string }) => {
    const { insert, origin, pos = 0 } = params;

    if (!insert) {
      return origin || '';
    }

    if (!origin) {
      return insert || '';
    }

    const prefix = origin.substring(0, pos);
    const suffix = origin.substring(pos);

    return [prefix, insert, suffix].join('');
  },

  // 仅中文、数字、英文大小写
  words: (str: string) => (str || '').trim().replaceAll(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, ''),

  cleaner: (str: string) => (str || '').trim().replaceAll(/[!@#$%^&*-+=[\]{}\\:;'"<,>./?]+/g, ''),

  bytes: (input: string) => {
    if (!input || typeof input !== 'string') {
      return 0;
    }

    if (encoder) {
      return encoder.encode(input).length;
    }

    let total = 0;

    for (let i = 0; i < input.length; i++) {
      let charCode = input.charCodeAt(i);
      if (charCode < 0x007f) {
        total++;
      } else if (0x0080 <= charCode && charCode <= 0x07ff) {
        total += 2;
      } else if (0x0800 <= charCode && charCode <= 0xffff) {
        total += 3;
      } else {
        total += 4;
      }
    }
    return total;
  },

  // 字符串处理掩码
  mask: (str: string, type?: string) => {
    const reg: RegExp = (type && StrReg[type]) || StrReg.mobile;
    const arr = (str || '').match(reg);

    if (arr) {
      const [, prefix, body = '', tails = ''] = arr;
      return [prefix, body.replace(/./g, '*'), tails].join('');
    }

    return str;
  },

  /** @name letter 生成指定长度的随机码[0~9a~zA~Z] */
  random: (len?: number, type?: RandomType) => {
    let result: string[] = [];

    const list = LetterOnly[type || 'dirty'];

    for (let i = 0; i < (len || 6); i++) {
      // 生成一个随机索引
      let index = Math.ceil(Math.random() * list.length);
      result.push(list[index]);
    }

    return result.join('');
  },
};

export default StrExtend;
