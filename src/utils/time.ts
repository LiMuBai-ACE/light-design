import dayjs from 'dayjs';
import type { Dayjs, QUnitType, OpUnitType } from 'dayjs';
import plugin from 'dayjs/plugin/duration';
import duration from 'dayjs/plugin/duration';

export type DateInstance = Dayjs;

export const TimeFormat = {
  hms: 'HH:mm:ss',
  ymd: 'YYYY-MM-DD',
  common: 'YYYY-MM-DD HH:mm:ss',
};

dayjs.extend(duration);

const TimeExtend = {
  instance: dayjs,
  month: (arg?: any) => dayjs(arg).month() + 1,
  /** @name duration 时长单位(如: 秒数) ——————> 时:分:秒 */
  duration: (num: number, unit?: plugin.DurationUnitType): string => {
    if (!num) {
      return '';
    }

    const _unit = unit || 'seconds';

    const inst = dayjs.duration(num, _unit);

    let format = TimeFormat.hms;

    if ((_unit === 'seconds' && num < 3600) || (_unit === 'minutes' && num < 60)) {
      format = 'mm:ss';
    }

    return inst.format(format);
  },

  //
  now: (format?: string) => dayjs().format(format || TimeFormat.common),

  stamp: (date?: any, type?: 's' | 'ms') => {
    const inst = dayjs(date);
    return type === 's' ? inst.unix() : inst.valueOf();
  },

  today: (format?: string) => dayjs().format(format || TimeFormat.common),

  yesterday: (format?: string) =>
    dayjs()
      .subtract(1, 'days')
      .format(format || TimeFormat.common),

  format: (date: any, format?: string) => dayjs(date).format(format || TimeFormat.common),

  /**
   * @name diff 获取时间两个时间点的差额
   * @param range [start, end] 开始时间 与 结束时间
   * @param unit 差额的单位，默认是天数
   * */
  diff: (range: any[], unit: QUnitType | OpUnitType) => dayjs(range[1]).diff(range[0], unit || 'days'),

  toDate: (arg: any) => dayjs(arg).toDate(),

  monthday: (arg?: any) => TimeExtend.format(arg, 'MM.DD'),

  subtract: (unit: any, value: any) => dayjs().subtract(unit, value).format(TimeFormat.ymd),

  halfYear: () => {
    const instance = dayjs();

    const endDate = instance.format('YYYY-MM-DD');

    const beginDate = instance.clone().subtract(6, 'months').format('YYYY-MM-DD');

    return { beginDate, endDate };
  },
};

export default TimeExtend;
