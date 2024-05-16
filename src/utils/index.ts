import { message } from 'antd';
import { JointContent } from 'antd/es/message/interface';
export * from "./common";

export type AnyJson = Record<string, any>;

export { default as JsonExtend } from "./json";

export { default as TimeExtend, TimeFormat, type DateInstance } from "./time";

export { default as StrExtend } from "./string";
export { default as NumExtend } from "./number";




export class Tips {
  static timer: NodeJS.Timeout | null = null;
  static errors: JointContent[] = [];

  static error(msg: JointContent, wait: number = 500, duration: number = 3, cb?: VoidFunction): void {
    clearTimeout(this.timer!);
    this.errors.push(msg);

    this.timer = setTimeout(() => {
      this.errors = this.errors.filter(Boolean);
      while (this.errors.length) {
        message.error(this.errors.shift(), duration, cb);
      }
    }, wait);
  }

  static success: typeof message.success = message.success;
  static warning: typeof message.warning = message.warning;
}
