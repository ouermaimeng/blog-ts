/*
 * @Author: wangcaowei
 * @Date: 2018-06-28 03:03:45
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-10 09:39:01
 */
import { actionTypes } from "../actions/type";
import { AnyAction } from "redux";
import { Del } from "./reduce.interface";

const initState: Del = {
  show: false,
  id: null
};

const del = (state = initState, action: AnyAction): Del => {
  switch (action.type) {
    case actionTypes.SHOW_DELETE:
      return { ...state, ...action.delete, show: !state.show };
    default:
      return state;
  }
};
export default del;
