import { actionTypes } from "./type";

// actionCreator 生成函数
const actionCreator = (type: actionTypes, ...keys: Array<string>) => (...args: Array<any>) => {
  return keys.reduce(
    (pre: any, cur: string, index) => {
      pre[cur] = args[index];
      return pre;
    },
    { type }
  );
};

// 获取所有的文章列表
export const getArticleList = actionCreator(actionTypes.GET_ALL_LIST, "articleList");

// 获取分类列表
export const getTagList = actionCreator(actionTypes.GET_TAG_LIST, "tagList");

// 根据id获取文章
export const getArticleById = actionCreator(actionTypes.GET_ARTICLE_BY_ID, "currentArticle");

// 是否显示登录界面
export const showLogin = actionCreator(actionTypes.SHOW_LOGIN, "status");

// 保存用户信息
export const saveUserInfo = actionCreator(actionTypes.SAVE_USER_INFO, "user");
