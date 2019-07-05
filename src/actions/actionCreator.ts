/*
 * @Author: wangcaowei
 * @Date: 2019-07-05 10:47:56
 * @Last Modified by: wangcaowei
 * @Last Modified time: 2019-07-05 10:53:52
 */
import { createActionCreator } from "./creatActionCreator";
import { actionTypes } from "./type";

// 获取所有的文章列表
export const getArticleList = createActionCreator(actionTypes.GET_ALL_LIST, "articleList");

// 获取分类列表
export const getTagList = createActionCreator(actionTypes.GET_TAG_LIST, "tagList");

// 根据id获取文章
export const getArticleById = createActionCreator(actionTypes.GET_ARTICLE_BY_ID, "currentArticle");

// 是否显示登录界面
export const showLogin = createActionCreator(actionTypes.SHOW_LOGIN, "status");

// 保存用户信息
export const saveUserInfo = createActionCreator(actionTypes.SAVE_USER_INFO, "user");
