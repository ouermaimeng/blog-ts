/*
 * @Author: wangcaowei
 * @Date: 2017-08-18 11:23:10
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-09 17:19:00
 */
import { actionTypes } from "../actions/type";
import { ArticleAndTag, ArticlesAttribute } from "../../interface/interface";
import { AnyAction } from "redux";

interface Article {
  articleList: Array<ArticleAndTag>;
  currentArticle: ArticlesAttribute | {};
}

const initState: Article = {
  articleList: [],
  currentArticle: {}
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
