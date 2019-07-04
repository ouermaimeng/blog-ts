/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 11:23:10
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-02-13 16:19:18
 */
import { actionTypes } from "../actions/type";

const article = (state = { articleList: [], currentArticle: {} }, action: any) => {
  switch (action.type) {
    case actionTypes.GET_ALL_LIST:
      return Object.assign({}, state, { articleList: action.articleList });
    case actionTypes.GET_ARTICLE_BY_ID:
      return Object.assign({}, state, { currentArticle: action.currentArticle });
    default:
      return state;
  }
};
export default article;
