import { nanoid } from 'nanoid';

/** 获取随机id */
export const getId = () => nanoid().replaceAll('_', '').replaceAll('-', '');
