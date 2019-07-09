/*
 * @Author: wangcaowei
 * @Date: 2018-06-28 03:03:45
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-09 17:20:22
 */
import { actionTypes } from "../actions/type";
import { AnyAction } from "redux";

interface Del {
  show: boolean;
  id: number | null;
}
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
