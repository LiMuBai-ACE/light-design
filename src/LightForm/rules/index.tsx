import { TimeExtend, type DateInstance } from 'light-design/utils';


export const DateCheck = {
  early: (self: any, target?: DateInstance) =>
    TimeExtend.instance(self).isBefore(target || TimeExtend.instance()),
};

export const DisabledRules = {
  // 限制只能选今天之后，包括今天
  later: (current: DateInstance) =>
    current && current < TimeExtend.instance().startOf('days'),
  // 限制只能选今天之前，包括今天
  today: (current: DateInstance) =>
    current && current > TimeExtend.instance().endOf('days'),
  // 限制只能选今天之前，不包括今天
  early: (current: DateInstance) =>
    current && current > TimeExtend.instance().subtract(1, 'days'),
};
