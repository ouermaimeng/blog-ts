/*
 * @Author: wangcaowei
 * @Date: 2019-01-23 16:26:35
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-10 16:11:58
 */

import status from "../server/config/status";

//  response of interface
export interface Response<T> {
  status: status;
  content?: T | null;
  msg?: string;
}
// table: articles
export interface ArticlesAttribute {
  id: number;
  title: string;
  content: string;
  createTime: Date;
  updateTime: Date;
  userid?: number;
  abstract: string;
}
export interface PublicArticle {
  title: string;
  content: string;
  abstract: string;
}
// table: articletagrelate
export interface ArticletagrelateAttribute {
  articleid?: number;
  tagid?: number;
  id?: number;
}
// table: tags
export interface TagsAttribute {
  id: number;
  tag: string;
}
// table: users
export interface UsersAttribute {
  id?: number;
  username: string;
  password: string;
  canwrite: number;
}

export interface ArticleAndTag extends ArticlesAttribute {
  tags: TagsAttribute[];
}

// interface ArticleList
export interface ArticleList extends Array<ArticleAndTag> {}

// add article
export interface InsertArticle {
  id: number | null;
  title: string;
  content: string;
  abstract: string;
  tags: number[];
  userid: number | null;
  // [key: string]: string | number | number[];
}

// login regist
export interface LoginOrRegist {
  username: string;
  password: string;
  verifyCode: string;
}

// userInfo
export interface UserInfo {
  id: number;
  username: string;
  token: string;
  canwrite: number;
}

// deleteArticleConfirm
export interface DeleteArticle {
  id: number;
  username: string;
  password: string;
}
