export const isfullyear = (year?: number) => !!year && year % 4 === 0; // 是否闰年

const MonthType = {
  // 小月
  lunar: [4, 6, 9, 11],
  // 大月
  solar: [1, 3, 5, 7, 8, 10, 12],
  // 获取全月的天数上限
  days: (month: number, year?: number) => {
    if (month === 2) {
      return isfullyear(year) ? 29 : 28;
    }
    return MonthType.lunar.includes(month) ? 30 : 31;
  },
  options: (month: number) => {
    const output = [];
    const length = MonthType.days(month);
    for (let i = 1; i <= length; i++) {
      output.push({ value: i, label: `${i}日` });
    }
    return output;
  },
};

interface OptionItem {
  value: number;
  label: string;
  children?: OptionItem[];
}

const MonthDateOptions: OptionItem[] = [];

// 创建全月日表
for (let i = 1; i <= 12; i++) {
  MonthDateOptions.push({
    value: i,
    label: `${i}月`,
    children: MonthType.options(i),
  });
}

export default MonthDateOptions;
