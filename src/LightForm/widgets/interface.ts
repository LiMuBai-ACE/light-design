import { DateInstance } from '@/utils';

export { DateInstance };

export type DateType = undefined | string | number | Date | DateInstance;

/** options 的 key-value 映射 */
export interface KeyMapProps {
  label: string;
  value: string;
  extra?: string;
}
