/*
 * @Author: wangcaowei
 * @Date: 2018-08-25 13:42:01
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-10 09:38:51
 */
import { actionTypes } from "../actions/type";
import { AnyAction } from "redux";
import { PublishArticle } from "./reduce.interface";

const initState: PublishArticle = {
  tagList: []
};

const publishArticle = (state = initState, action: AnyAction): PublishArticle => {
  switch (action.type) {
    case actionTypes.GET_TAG_LIST:
      return Object.assign({}, state, { tagList: action.tagList });
    default:
      return state;
  }
};
export default publishArticle;
