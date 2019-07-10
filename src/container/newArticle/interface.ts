/*
 * @Author: wangcaowei
 * @Date: 2019-07-10 16:06:04
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-10 16:34:47
 */

import { TagsAttribute, UserInfo, ArticlesAttribute } from "../../../interface/interface";
import { History } from "history";

interface OwnProps {
  history: History;
}

export interface MapDispatchProps {
  getTagList: () => Promise<void>;
  getArticleById: (id: number) => Promise<void>;
}

export interface MapStateProps {
  tagList: Array<TagsAttribute>;
  userInfo: UserInfo | null;
  currentArticle: ArticlesAttribute | null;
}

export type Props = OwnProps & MapStateProps & MapDispatchProps;

export interface States {
  id: number | null; // null:insert;number:update
  title: string; // 标题
  abstract: string; // 摘要
  tags: any[]; // 对应的tag
  content: string; // markdown
  button: boolean; // 是否能够提交
  html: string; // markdown => html
}
