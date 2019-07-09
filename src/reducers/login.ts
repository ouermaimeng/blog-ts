/*
 * @Author: wangcaowei
 * @Date: 2018-03-01 03:01:48
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-09 17:22:08
 */
import { actionTypes } from "../actions/type";
import { AnyAction } from "redux";
import { UserInfo } from "../../interface/interface";
interface User {
  showLogin: boolean;
  user: UserInfo | null;
}

const initState: User = {
  showLogin: false,
  user: null
};
const user = (state = initState, action: AnyAction): User => {
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
