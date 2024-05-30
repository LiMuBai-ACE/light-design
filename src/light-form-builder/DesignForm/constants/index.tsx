export const ItemTypes = { WIDGET: 'widget' };

export enum WidgetFormEnum {
  // 简洁的
  'SingleForm' = 'SingleForm',
  // 分区的
  'SectionForm' = 'SectionForm',
}

// 递归查找当前 id 的数据
export function findItem(dataList: any, id: string) {
  let result = null;
  dataList.forEach((item) => {
    const loop = (data) => {
      if (data.id === id) {
        result = data;
        return result;
      }

      const fields = data.fields;

      if (fields) {
        for (let i = 0; i < fields.length; i += 1) {
          loop(fields[i]);
        }
      }
    };

    loop(item);
  });

  return result;
}
