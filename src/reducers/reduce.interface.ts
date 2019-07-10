/*
 * @Author: wangcaowei
 * @Date: 2019-07-10 09:34:56
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-10 16:37:05
 */

import { ArticleAndTag, UserInfo, TagsAttribute } from "../../interface/interface";
import { RouterState } from "connected-react-router";

export interface Article {
  articleList: Array<ArticleAndTag>;
  currentArticle: ArticleAndTag | null;
}

export interface Del {
  show: boolean;
  id: number | null;
}

export interface User {
  showLogin: boolean;
  user: UserInfo | null;
}

export interface PublishArticle {
  tagList: Array<TagsAttribute>;
}

export interface globalState {
  router: RouterState;
  article: Article;
  del: Del;
  user: User;
  publishArticle: PublishArticle;
}
