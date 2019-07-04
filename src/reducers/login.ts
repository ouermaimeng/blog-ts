/*
 * @Author: wangcaowei
 * @Date: 2018-03-01 03:01:48
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-13 16:19:13
 */
import { actionTypes } from "../actions/type";
const initState = {
  showLogin: false,
  user: null
};
const user = (state = initState, action: any) => {
  switch (action.type) {
    case actionTypes.SAVE_USER_INFO:
      return Object.assign({}, state, { user: action.user });
    case actionTypes.SHOW_LOGIN:
      return Object.assign({}, state, { showLogin: !action.status });
    default:
      return state;
  }
};
export default user;
