/*
 * @Author: wangcaowei
 * @Date: 2018-08-25 13:42:01
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-09 17:24:30
 */
import { actionTypes } from "../actions/type";
import { TagsAttribute } from "../../interface/interface";
import { AnyAction } from "redux";

interface PublishArticle {
  tagList: Array<TagsAttribute>;
}
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
