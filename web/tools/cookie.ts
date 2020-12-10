/**
 * @description cookie 操作
 * @author zhengwenjian
 */

import { Context } from "midway";

export default {
  /**
   * 取cookie值
   * @param key cookie key值
   */
  getCookie(key: string): string | undefined {
    const str = document.cookie;
    const arr = str.split(';');
    let value: string | undefined;
    for (let i = 0; i < arr.length; i++) {
      const data = arr[i].split('=');
      if (data[0].trim() === key) {
        value = data[1];
        break;
      }
    }
    return value;
  },
  /**
   * 设置cookie
   * @param key 键
   * @param value 值
   */
  setCookie(key: string, value: string, path: string = '/') {
    document.cookie = `${key}=${value};path=${path}`;
  },
};

/**
 * 获取服务端cookie
 * @param ctx 服务端上下文
 * @param key cookie的key值
 */
export const getServerCookie = (ctx: Context, key: string) => {
  return ctx.cookies.get(key, { encrypt: false, signed: false });
}
