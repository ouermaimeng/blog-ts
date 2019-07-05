/*
 * @Author: wangcaowei
 * @Date: 2019-07-05 10:44:09
 * @Last Modified by:   wangcaowei
 * @Last Modified time: 2019-07-05 10:44:09
 */
import { actionTypes } from "./type";

//生成 actionCreator 的函数
export const createActionCreator = (type: actionTypes, ...keys: Array<string>) => (...args: Array<any>) => {
  return keys.reduce(
    (pre: any, cur: string, index) => {
      pre[cur] = args[index];
      return pre;
    },
    { type }
  );
};
