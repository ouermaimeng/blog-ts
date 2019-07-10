/*
 * @Author: wangcaowei
 * @Date: 2019-07-05 10:44:09
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-10 10:01:58
 */
import { actionTypes } from "./type";
import { AnyAction, ActionCreator } from "redux";

//生成 actionCreator 的函数
export const createActionCreator = (type: actionTypes, ...keys: Array<string>): ActionCreator<AnyAction> => (...args: Array<any>): AnyAction => {
  return keys.reduce(
    (pre: any, cur: string, index) => {
      pre[cur] = args[index];
      return pre;
    },
    { type }
  );
};
