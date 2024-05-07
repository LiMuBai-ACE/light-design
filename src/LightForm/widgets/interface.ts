import { DateInstance } from '@/utils';

export type DateType = undefined | string | number | Date | DateInstance;

/** options 的 key-value 映射 */
export interface KeyMapProps {
  label: string;
  value: string;
  extra?: string;
}
