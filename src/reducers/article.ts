/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 11:23:10
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-10 17:14:14
 */
import { actionTypes } from "../actions/type";
import { AnyAction } from "redux";
import { Article } from "./reduce.interface";

const initState: Article = {
  articleList: [],
  currentArticle: null
};

const article = (state = initState, action: AnyAction): Article => {
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
